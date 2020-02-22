import React, { Component } from "react";
import ImageItem from "../ImageItem";
import "./ImageList.css";
class ImageList extends Component {
  render() {
    const { items } = this.props;
    const imageList = items.map((item, index) => (
      <ImageItem item={item} key={index}></ImageItem>
    ));
    return (
      <div className="image-list">
        {imageList}
        <a></a>
      </div>
    );
  }
}

export default ImageList;
