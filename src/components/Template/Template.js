import React, { Component } from "react";

class Template extends Component {
  render() {
    return (
      <div>
        <h1>Nasa Image Search Application</h1> <sub>made by marco lee</sub>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default Template;
