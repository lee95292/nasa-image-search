import React, { Component } from "react";
import Template from "./Template";
import ImageList from "./ImageList";
import Navigation from "./Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
export class App extends Component {
  render() {
    return (
      <div>
        <Template>
          <Navigation />
          <ImageList />
        </Template>
      </div>
    );
  }
}

export default App;
