import React, { Component } from "react";
import {
  Navbar,
  NavDropdown,
  Nav,
  Form,
  FormControl,
  Button
} from "react-bootstrap";
class Navigation extends Component {
  state = {
    filter: "전체",
    input: ""
  };
  handleFilter = e => {
    this.setState({ filter: e.target.text });
  };
  handleSearch = e => {
    //axios
  };
  handleChange = e => {};
  render() {
    const { filter } = this.state;
    const { total_hit } = this.props;
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
            <Form inline>
              <NavDropdown title={filter} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={this.handleFilter}>
                  전체
                </NavDropdown.Item>
                <NavDropdown.Item onClick={this.handleFilter}>
                  제목
                </NavDropdown.Item>
                <NavDropdown.Item onClick={this.handleFilter}>
                  키워드
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={this.handleFilter}>
                  결과 내 검색
                </NavDropdown.Item>
              </NavDropdown>
              <FormControl
                onChange={this.handleChange}
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        검색결과 : {total_hit}개
      </div>
    );
  }
}

export default Navigation;
