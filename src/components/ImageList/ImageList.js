import React, { Component } from "react";
import ImageItem from "../ImageItem";
import "./ImageList.css";
class ImageList extends Component {
  render() {
    const { items } = this.props;
    console.log(items);
    let imageList = null;
    if (items != null && items.length > 0) {
      imageList = items.map((item, index) => (
        <ImageItem item={item} key={index}></ImageItem>
      ));
    }
    return (
      <div className="image-list">
        {imageList}
        <a></a>
      </div>
    );
  }
}

export default ImageList;
