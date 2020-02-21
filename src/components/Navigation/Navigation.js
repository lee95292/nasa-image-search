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
    filter: "test1",
    input: ""
  };
  handleFilter = e => {
    this.setState({ filter: e.target.text });
  };
  handleSearch = e => {
    //axios
  };
  handleChange = e => {
    console.log(e.target.value);
  };
  render() {
    const { filter } = this.state;
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
                  test2
                </NavDropdown.Item>
                <NavDropdown.Item onClick={this.handleFilter}>
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item onClick={this.handleFilter}>
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={this.handleFilter}>
                  Separated link
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
      </div>
    );
  }
}

export default Navigation;
