
import React, { Component } from "react";
import { Navbar, NavDropdown, Nav, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navigation.css";

const filterMapper = {};
const activeStyle = {
  backgroundColor:'gray',
  textDecoration:'underline',
}

filterMapper["total"] = "Total";
filterMapper["title"] = "Title";
filterMapper["keyword"] = "Keyword";
class Navigation extends Component {
  state = {
    filter: "total",
    input: ""
  };
  handleFilter = e => {
    this.setState({ filter: e.target.name });
  };
  handleKeyPress = e => {
    const { filter, input } = this.state;
    if (e.key === "Enter") {
      this.props.onSubmit(filter, input);
      console.log(input);
    }
  };
  handleChange = e => {
    this.setState({ input: e.target.value });
  };
  render() {
    const { filter, input } = this.state;
    const { onSubmit } = this.props;
    return (
      <div>
        <Navbar bg="light" expand="lg">
          {/* <Navbar.Brand href="#home">Nasa</Navbar.Brand> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav variant="pills" defaultActiveKey="/" className="mr-auto">
              <Nav.Item>
                <Nav.Link>
                  <Link exact to="/">
                    Home
                  </Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>
                  <Link exact to="/bookmark">
                    Bookmark
                  </Link>
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <div className="inline">
              <NavDropdown title={filterMapper[filter]} id="basic-nav-dropdown">
                {
                  Object.keys(filterMapper).map( (filter) => 
                    <NavDropdown.Item onClick={this.handleFilter} name={filter}>
                      {filterMapper[filter]}
                    </NavDropdown.Item>

                )}
              </NavDropdown>
              <FormControl
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button
                variant="outline-success"
                onClick={() => onSubmit(filter, input)}
              >
                Search
              </Button>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;
