import React, { Component } from "react";
import Template from "./Template";
import ImageList from "./ImageList";
import Navigation from "./Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
class App extends Component {
  state = {
    items: [{ title: "test", desc: "test", image: "test" }]
  };

  render() {
    const { items } = this.state;
    return (
      <div>
        <Template>
          <Navigation />
          <ImageList item={items} />
        </Template>
      </div>
    );
  }
}

export default App;
