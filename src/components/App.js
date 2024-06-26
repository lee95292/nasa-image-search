import React, { Component } from "react";
import Template from "./Template";
import ImageList from "./ImageList";
import Navigation from "./Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { BrowserRouter, Route ,Routes } from "react-router-dom";
import "./App.css";

const nasaAPIRUL = "https://images-api.nasa.gov/";
let storageCollection = null;
let storageBookmark = null;

const filterMapper = {
  title: "title",
  total: "q",
  keyword: "keywords",
  year_start: "year_start",
  year_end: "year_end",
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      page: 1,
      bookmark: [],
      activeFilter: "total",
      query: {
        total: "moon",
        keyword: "",
        title: "",
        year_start: "",
        year_end: "",
      },
      total_hit: 0,
    };
    this.cardListRef = React.createRef();
    this.scrollObserver = null;
  }

  handleFilter = (e) => {
    this.setState({ activeFilter: e.target.name });
  };

  removeQuery = (e) => {
    this.setState({
      query: {
        ...this.state.query,
        [e.target.name]: "",
      },
    });
  };

  handleChange = (e) => {
    const { activeFilter, query } = this.state;
    const input = e.target.value;
    this.setState({
      query: {
        ...query,
        [activeFilter]: input,
      },
    });
  };
  shouldComponentUpdate(nextState) {
    const bookmark = this.state.bookmark !== nextState.bookmark;
    const items = this.state.items !== nextState.items;
    const page = this.state.page !== nextState.page;

    return bookmark || items || page;
  }
  handleBookmark = (item) => {
    const bookmark = this.state.bookmark;
    const index = bookmark.indexOf(item);

    if (index < 0) {
      console.log("handleBookmark push " + item);
      bookmark.push(item);
      alert("Bookmarked");
    } else {
      // route가 bookmark일때만 지우는 조건 : 현재 home탭에서도 북마크 삭제 가능
      console.log(item + "removed");
      bookmark.splice(index, 1);
      alert("Bookmark deleted");
    }

    this.setState({
      bookmark: bookmark,
    });
    localStorage.setItem("bookmark", JSON.stringify(bookmark));
  };

  handlePagination = () => {
    const { page, items } = this.state;
    storageCollection = JSON.parse(localStorage.getItem("collection"));
    // 새로 요청하여 업데이트해야하는 경우
    if (
      page % 10 === 9 && // localstorage에 저장된 마지막 페이지
      storageCollection.links !== null && // REST에서 제공되는 좌표 X
      storageCollection.links[storageCollection.links.length - 1].rel != "prev" // 마지막 페이지가 아님
    ) {
      axios.get(storageCollection.links[0].href).then((res) => {
        const nextpageItems = res.data.collection.items;

        storageCollection = JSON.parse(localStorage.getItem("collection"));
        storageCollection.items = storageCollection.items.concat(nextpageItems);
        storageCollection.links = res.data.collection.links;

        localStorage.setItem("collection", JSON.stringify(storageCollection));
      });
    }

    if (
      storageCollection &&
      storageCollection.items &&
      items.length < storageCollection.items.length
    ) {
      this.setState({
        page: page + 1,
        items: items.concat(
          storageCollection.items.slice(page * 10, (page + 1) * 10)
        ),
      });
      console.log(this.state.items);
    }
  };

  handleSearch = (searchQuery = { total: "moon" }) => {
    const queryString = Object.keys(searchQuery)
      .map((queryName) => {
        return searchQuery[queryName]
          ? filterMapper[queryName] + "=" + searchQuery[queryName] + "&"
          : "";
      })
      .join("");
    axios
      .get(nasaAPIRUL + "search?" + queryString)
      .then((res) => {
        localStorage.setItem("collection", JSON.stringify(res.data.collection));
        this.setState({
          items: res.data.collection.items.slice(0, 10),
          query: {
            ...this.state.query,
            ...searchQuery,
          },
          page: 1,
          total_hit: res.data.collection.metadata.total_hits,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  loadInitialImageItems() {
    const { query, page } = this.state;
    storageCollection = JSON.parse(localStorage.getItem("collection"));

    if (storageCollection != null) {
      this.setState({
        items: storageCollection.items.slice(0, 10),
        total_hit: storageCollection.metadata.total_hits,
      });
    }
    // LocalStorage에 저장된 데이터 없이 초기 로딩
    else {
      axios
        .get(nasaAPIRUL + "search?q=" + query.total + "&page=" + page)
        .then((res) => {
          const defaultItems = res.data.collection;

          this.setState({
            items: defaultItems.items.slice(0, 10),
            total_hit: res.data.collection.metadata.total_hits,
          });
          localStorage.setItem("collection", JSON.stringify(defaultItems));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  loadInitailBookmarkItems() {
    storageBookmark = JSON.parse(localStorage.getItem("bookmark"));

    if (storageBookmark != null) {
      this.setState({
        bookmark: storageBookmark,
      });
    } else {
      this.setState({
        bookmark: [],
      });
    }
  }
  componentDidMount() {
    this.loadInitialImageItems();
    this.loadInitailBookmarkItems();
    console.log("this.cardListRef", this.cardListRef);
    if (this.cardListRef) {
      this.scrollObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.handlePagination();
          }
        },
        { threshold: 0.1 }
      );
      this.scrollObserver.observe(this.cardListRef.current);
    }
  }

  render() {
    const { items, total_hit, bookmark, query, activeFilter } = this.state;
    const { offsetHeight } = document.body;
    return (
      <div>
        <BrowserRouter>
        
        <Template>
          <div className="content--canvas"></div>
          <Navigation
            onSubmit={() => this.handleSearch(query)}
            handleFilter={this.handleFilter}
            handleChange={this.handleChange}
            removeQuery={this.removeQuery}
            activeFilter={activeFilter}
            query={query}
            total_hit={total_hit}
          />
          <Routes>

          <Route
            exact
            path="/"
            render={() => (
              <div>
                {total_hit} Search result
                <ImageList items={items} onBookmark={this.handleBookmark} />
                {total_hit > items.length && (
                  <div className="page-add" onMouseOver={this.handlePagination}>
                    more..
                  </div>
                )}
              </div>
            )}
          />
          <Route
            render={() => (
              <div>
                {bookmark.length} Bookmarks
                <ImageList items={bookmark} onBookmark={this.handleBookmark} />
              </div>
            )}
            path="/bookmark"
          />
          </Routes>
        </Template>
        <div
          ref={this.cardListRef}
          style={{
            // display:'none',
            position: "absolute",
            bottom: -offsetHeight + 600,
          }}
        >
          {" "}
          ---
        </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
