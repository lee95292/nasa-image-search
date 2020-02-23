import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import "./Template.css";
class Template extends Component {
  render() {
    return (
      <div className="template">
        <h1>Nasa Image Search Application</h1> <sub>made by marco lee</sub>
        <BrowserRouter>{this.props.children}</BrowserRouter>
      </div>
    );
  }
}

export default Template;
