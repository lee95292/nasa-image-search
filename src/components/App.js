import React, { Component } from "react";
import Template from "./Template";
import ImageList from "./ImageList";
import Navigation from "./Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Route } from "react-router-dom";
const nasaAPIRUL = "https://images-api.nasa.gov/";
let storageCollection = null;

const queryMapper = {};
queryMapper["title"] = "title";
queryMapper["total"] = "q";
queryMapper["keyword"] = "keywords";

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
  handleBookmark = item => {
    const bookmark = this.state.bookmark;
    this.setState({
      bookmark: {
        ...bookmark,
        item
      }
    });

    console.log(bookmark);
  };
  handlePagination = () => {
    const { page, items } = this.state;
    storageCollection = JSON.parse(localStorage.getItem("collection"));
    // 새로 요청하여 업데이트해야하는 경우
    if (
      page % 10 === 9 && // localstorage에 저장된 마지막 페이지
      storageCollection.links != null && // REST에서 제공되는 좌표 X
      storageCollection.links[storageCollection.links.length - 1].rel != "prev" // 마지막 페이지가 아님
    ) {
      axios.get(storageCollection.links[0].href).then(res => {
        console.log(res);
        const nextpageItems = res.data.collection.items;

        storageCollection = JSON.parse(localStorage.getItem("collection"));
        storageCollection.items = storageCollection.items.concat(nextpageItems);
        storageCollection.links = res.data.collection.links;

        localStorage.setItem("collection", JSON.stringify(storageCollection));
      });
    }

    if (items.length < storageCollection.items.length) {
      this.setState({
        page: page + 1,
        items: items.concat(
          storageCollection.items.slice(page * 10, (page + 1) * 10)
        )
      });
      console.log(this.state.items);
    }
  };
  handleSearch = (filter, input) => {
    axios
      .get(nasaAPIRUL + "search?" + queryMapper[filter] + "=" + input)
      .then(res => {
        localStorage.setItem("collection", JSON.stringify(res.data.collection));
        this.setState({
          items: res.data.collection.items.slice(0, 10),
          query: {
            ...this.state,
            [filter]: input
          },
          page: 1,
          total_hit: res.data.collection.metadata.total_hits
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    console.log("test");
    const { query, page } = this.state;
    storageCollection = JSON.parse(localStorage.getItem("collection"));
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
        const defaultItems = res.data.collection;

        this.setState({
          items: defaultItems.items.slice(0, 10),
          total_hit: res.data.collection.metadata.total_hits
        });
        localStorage.setItem("collection", JSON.stringify(defaultItems));
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    const { items, total_hit, bookmark } = this.state;
    const BookmarkList = items => <ImageList items={items} />;
    const SearchResult = (items, handlePagination) => (
      <div>
        <ImageList items={items} />
        <span onClick={handlePagination}>more..</span>
      </div>
    );
    return (
      <div>
        <Template>
          <Navigation total_hit={total_hit} onSubmit={this.handleSearch} />
          <Route
            exaxt
            path="/"
            render={() => (
              <SearchResult
                handlePagination={this.handlePagination}
                items={items}
              />
            )}
          />
          {/* <Route exact path="bookmark" component={bookmark => BookmarkList} /> */}
        </Template>
      </div>
    );
  }
}

export default App;
