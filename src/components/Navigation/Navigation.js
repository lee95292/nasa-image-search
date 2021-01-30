
import React, { Component } from "react";
import { Navbar, NavDropdown, FormControl, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

const navActiveStyle = {
  backgroundColor: 'gray',
  textDecoration: 'underline',
  color:'white'
};

const queryBlockStyle = {
  backgroundColor: 'gray',
  padding: '7px',
  margin: '1px 1px 1px 1px',
  color: 'white',
  borderRadius: '0.8rem',
  button:{
    display:'none'
  }
}
const navStyle = {
  color: 'black',
  margin: '1rem 1rem 1rem 1rem',
  padding: '7px',
  borderRadius: '0.6rem'
};

const filterNameMapper = {
  title:"Title",
  total:"Total",
  keyword:"Keywords",
  year_start:"Year start",
  year_end:"Year end"
};

class Navigation extends Component {
  handleKeyPress = e => {
    const { onSubmit } = this.props;
    if (e.key === "Enter") {
      onSubmit();
    }
  };
  
  render() {
    const { onSubmit, handleChange, handleFilter, activeFilter, query, removeQuery } = this.props;
    console.log('Navigation, this.props', this.props);
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
              <NavDropdown title={filterNameMapper[activeFilter]} id="basic-nav-dropdown">
                {Object.keys(query).map((filter) =>
                    <NavDropdown.Item onClick={handleFilter} name={filter}>
                      {filterNameMapper[filter]}
                    </NavDropdown.Item>
                  )}
              </NavDropdown>
              <FormControl
                value={query[activeFilter]}
                onChange={handleChange}
                onKeyPress={this.handleKeyPress}
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              
            </div>
          </Navbar.Collapse>
          <div style={{marginTop:'10px'}}>
          {/* TODO: 디자인하기, 쿼리 지우기 */}
          {Object.keys(query).map(filter => 
            query[filter] && (
              <span
                style={queryBlockStyle}
                name={filter}
                >
                {filter+ ": " + query[filter]} 
                <button name={filter} onClick={removeQuery}>X</button>
              </span>
            )
          )}
         </div>
         <Button
          variant="outline-success"
          onClick={onSubmit}
          >
          Search
        </Button>
        </Navbar>
       
      </div>
    );
  }
}

export default Navigation;
