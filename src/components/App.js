import React, { Component } from "react";
import Template from "./Template";
import ImageList from "./ImageList";
import Navigation from "./Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const nasaAPIRUL = "https://images-api.nasa.gov/";
class App extends Component {
  state = {
    items: [],
    page: 1,
    bookmark: [],
    query: {
      total: "moon",
      keyword: "",
      title: ""
    },
    total_hit: 0
  };

  handlePagination = () => {
    const { page, query, items } = this.state;
    let storageCollection = JSON.parse(localStorage.getItem("collection"));
    // 새로 요청하여 업데이트해야하는 경우
    if (page % 10 === 9) {
      axios
        .get(
          nasaAPIRUL +
            "search?q=" +
            query.total +
            "&page=" +
            parseInt((page + 1) / 10)
        )
        .then(res => {
          console.log(res);
          const nextpageItems = res.data.collection.items;
          storageCollection.items = storageCollection.items.concat(
            nextpageItems
          );
          localStorage.setItem("collection", JSON.stringify(storageCollection));
        });
    }
    this.setState({
      page: page + 1,
      items: items.concat(
        storageCollection.items.slice(page * 10, (page + 1) * 10)
      )
    });
    console.log(this.state.items);
  };
  componentWillMount() {
    const { query, page } = this.state;
    const storageCollection = JSON.parse(localStorage.getItem("collection"));
    if (storageCollection != null) {
      this.setState({
        items: storageCollection.items.slice(0, 10),
        total_hit: storageCollection.metadata.total_hits
      });
      return;
    }

    axios
      .get(nasaAPIRUL + "search?q=" + query.total + "&page=" + page)
      .then(res => {
        console.log(res);
        const defaultItems = res.data.collection;

        this.setState({
          items: defaultItems.items.slice(0, 10),
          total_hit: res.data.collection.metadata.total_hits
        });
        localStorage.setItem("collection", JSON.stringify(defaultItems));
      });
  }
  render() {
    const { items, total_hit } = this.state;
    return (
      <div>
        <Template>
          <Navigation total_hit={total_hit} />
          <ImageList items={items} />
          <span onClick={this.handlePagination}>more..</span>
        </Template>
      </div>
    );
  }
}

export default App;
