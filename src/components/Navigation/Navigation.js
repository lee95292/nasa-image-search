import React, { Component } from "react";
import { Navbar, NavDropdown, Nav, FormControl, Button } from "react-bootstrap";
import "./Navigation.css";

const filterMapper = {};

filterMapper["total"] = "전체";
filterMapper["title"] = "제목";
filterMapper["keyword"] = "키워드";
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
    const { total_hit, onSubmit } = this.props;
    return (
      <div>
        <Navbar bg="light" expand="lg">
          {/* <Navbar.Brand href="#home">Nasa</Navbar.Brand> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#bookmark">Bookmark</Nav.Link>
            </Nav>
            <div className="inline">
              <NavDropdown title={filterMapper[filter]} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={this.handleFilter} name="total">
                  전체
                </NavDropdown.Item>
                <NavDropdown.Item onClick={this.handleFilter} name="title">
                  제목
                </NavDropdown.Item>
                <NavDropdown.Item onClick={this.handleFilter} name="keyword">
                  키워드
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={this.handleFilter}>
                  결과 내 검색
                </NavDropdown.Item>
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
                // onClick={onSubmit(filter, input)}
              >
                Search
              </Button>
            </div>
          </Navbar.Collapse>
        </Navbar>
        검색결과 : {total_hit}개
      </div>
    );
  }
}

export default Navigation;
