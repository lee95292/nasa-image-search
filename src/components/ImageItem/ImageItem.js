import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import "./ImageItem.css";

let imageSource = "";
class ImageItem extends Component {
  state = {
    vervose: false
  };

  handleVervose = () => {
    this.setState({ vervose: !this.state.vervose });
  };
  componentWillMount() {
    imageSource = "/default-image.jpg";
  }
  render() {
    const { item } = this.props;
    let contentLen = 0;
    if (item.links != null) {
      imageSource = item.links[0].href;
    }
    let keywords = null;
    if (item.data[0].keywords != null) {
      keywords = item.data[0].keywords.map((keyword, index) => (
        <Button variant="primary" key={index}>
          {keyword}
        </Button>
      ));
    }

    const summary = item.data[0].description
      .split(" ")
      .filter(v => {
        contentLen += v.length;
        if (contentLen <= 150) {
          return v;
        }
      })
      .join(" ");

    let foldable = this.state.vervose ? (
      <span className="foldable" onClick={this.handleVervose}>
        fold
      </span>
    ) : (
      <span className="foldable" onClick={this.handleVervose}>
        more..
      </span>
    );

    if (contentLen < 150) {
      foldable = null;
    }

    return (
      <div className="image-item">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={imageSource} />
          <Card.Body>
            <Card.Title>{item.data[0].title}</Card.Title>
            <Card.Text>
              {this.state.vervose ? item.data[0].description : summary}
              {foldable}
            </Card.Text>
            {keywords}
            <hr />
            {item.data[0].date_created.slice(0, 10)}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default ImageItem;
