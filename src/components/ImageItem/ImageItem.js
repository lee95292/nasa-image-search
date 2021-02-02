import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import "./ImageItem.css";

let imageSource = "";
class ImageItem extends Component {
  state = {
    vervose: false,
    vervoseKeyword: false
  };

  handleVervose = () => {
    this.setState({ vervose: !this.state.vervose });
  };

  handleVervoseKeyword = () => {
    this.setState({ vervoseKeyword: !this.state.vervoseKeyword });
  };
  componentWillMount() {
    imageSource = "/default-image.jpg";
  }
  render() {
    const { item, onBookmark } = this.props;
    const { vervose, vervoseKeyword } = this.state;
    let contentLen = 0;
    if (item.links != null) {
      imageSource = item.links[0].href;
    }

    let summary;
    if (item.data[0].description != null) {
      summary = item.data[0].description
        .split(" ")
        .filter(v => {
          contentLen += v.length;
          if (contentLen <= 150) {
            return v;
          }
        })
        .join(" ");
    }

    let foldable = vervose ? (
      <span className="foldable" onClick={this.handleVervose}>
        ..fold
      </span>
    ) : (
        <span className="foldable" onClick={this.handleVervose}>
          more..
        </span>
      );

    let numOfdisplayKeyword = 0;
    let numOfKeyword = 0;
    let keywords = null;
    if (item.data[0].keywords != null) {
      numOfdisplayKeyword = item.data[0].keywords.lenght;
      numOfKeyword = item.data[0].keywords.lenght;
      if (!vervoseKeyword) {
        numOfdisplayKeyword = 5;
      }
      keywords = item.data[0].keywords
        .slice(0, numOfdisplayKeyword)
        .map((keyword, index) => (
          <Button variant="primary" key={index}>
            {keyword}
          </Button>
        ));
    }
    let keywordFoldable =
      vervoseKeyword && numOfKeyword > 5 ? (
        <span className="foldable" onClick={this.handleKeywordVervose}>
          ..fold
        </span>
      ) : (
          <span className="foldable" onClick={this.handleKeywordVervose}>
            more..
          </span>
        );

    return (
      <div className="image-item" onDoubleClick={() => onBookmark(item)}>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={imageSource} />
          <Card.Body>
            <Card.Title>{item.data[0].title}</Card.Title>
            <Card.Text>
              {vervose ? item.data[0].description : summary}
              {contentLen > 150 && foldable}
            </Card.Text>
            {keywords}
            {numOfKeyword > 5 && keywordFoldable}
            <hr />
            {item.data[0].date_created.slice(0, 10)}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default ImageItem;
