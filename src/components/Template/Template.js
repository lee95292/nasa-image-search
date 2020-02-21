import React, { Component } from "react";
import "./Template.css";
class Template extends Component {
  render() {
    return (
      <div className="template">
        <h1>Nasa Image Search Application</h1> <sub>made by marco lee</sub>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default Template;
