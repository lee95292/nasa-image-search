import React, { Component } from "react";
import ImageItem from "../ImageItem";
class ImageList extends Component {
  render() {
    const { items } = this.props;
    const imageList = items.map(item => <ImageItem item={item}></ImageItem>);
    return (
      <div>
        {imageList}
        <a></a>
      </div>
    );
  }
}

export default ImageList;
