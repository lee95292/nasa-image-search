
import React, { Component } from "react";
import { Navbar, NavDropdown, Nav, FormControl, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

const navActiveStyle = {
  backgroundColor: 'gray',
  textDecoration: 'underline',
  color:'white'
};

const navStyle = {
  color: 'black',
  margin: '1rem 1rem 1rem 1rem',
  padding: '7px',
  borderRadius: '0.6rem'
};

const filterMapper = {
  total:"Total",
  title:"Title",
  keyword:"Keyword"
};

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
          <Navbar.Toggle aria-controls="basic-navbar-nav" style={{marginBottom: '10px'}}/>
          <Navbar.Collapse id="basic-navbar-nav">
            <NavLink exact to="/" style={navStyle} activeStyle={navActiveStyle}>
              Home
            </NavLink>
            <NavLink exact to="/bookmark" style={navStyle} activeStyle={navActiveStyle}>
              Bookmark
            </NavLink>
            <p></p>
            <div className="inline">
              <NavDropdown title={filterMapper[filter]} id="basic-nav-dropdown">
                {Object.keys(filterMapper).map((filter) =>
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
