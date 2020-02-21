import React, { Component } from "react";
import Template from "./Template";
import ImageList from "./ImageList";
import Navigation from "./Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
class App extends Component {
  state = {
    item: [{ title: "test", desc: "test", image: "test" }]
  };

  render() {
    const { item } = this.state;
    return (
      <div>
        <Template>
          <Navigation />
          <ImageList item={item} />
        </Template>
      </div>
    );
  }
}

export default App;
