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
    query: "moon"
  };

  handlePagination = () => {
    const { page, query } = this.state;
    if (page % 10 === 9) {
      axios
        .get(nasaAPIRUL + "search?q=" + query + "&page" + (page + 1) / 10)
        .then(res => {
          const prevItem = localStorage.get("items");
          localStorage.setItem(prevItem.concat(res.data.collection.items));
        });
    }
    this.setState({ page: page + 1 });
  };
  componentDidMount() {
    const { query, page } = this.state;
    if (localStorage.getItem("items") !== null) {
      // return;
    }

    axios.get(nasaAPIRUL + "search?q=" + query + "&page=" + page).then(res => {
      console.log(res);
      const defaultItems = res.data.collection.items;

      this.setState({
        items: defaultItems.slice(0, 10)
      });
      localStorage.setItem("items", defaultItems);
      console.log(defaultItems);
    });
  }
  render() {
    const { items } = this.state;
    return (
      <div>
        <Template>
          <Navigation />
          <ImageList items={items} />
          <a href="pg"></a>
        </Template>
      </div>
    );
  }
}

export default App;
