import React, { Component } from "react";
import { Navbar, NavDropdown, FormControl, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

const navActiveStyle = {
  backgroundColor: "gray",
  textDecoration: "underline",
  color: "white",
};

const filterNameMapper = {
  title: "Title",
  total: "Total",
  keyword: "Keywords",
  year_start: "Year start",
  year_end: "Year end",
};

class Navigation extends Component {
  handleKeyPress = (e) => {
    const { onSubmit } = this.props;
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  render() {
    const {
      onSubmit,
      handleChange,
      handleFilter,
      activeFilter,
      query,
      removeQuery,
    } = this.props;
    console.log(styles);
    return (
      <div className={styles.navigation}>
        <Navbar expand="sm">
          <NavLink
            exact
            to="/"
            className={styles.navStyle}
            activeStyle={navActiveStyle}
          >
            Home
          </NavLink>
          <NavLink
            exact
            to="/bookmark"
            className={styles.navStyle}
            activeStyle={navActiveStyle}
          >
            Bookmark
          </NavLink>
          <NavLink
            exact
            to="/about"
            className={styles.navStyle}
            activeStyle={navActiveStyle}
          >
            About
          </NavLink>
        </Navbar>
        <div className={styles.searchContainer}>
          <div className={styles.searchBox}>
            <NavDropdown
              title={filterNameMapper[activeFilter]}
              id="basic-nav-dropdown"
            >
              {Object.keys(query).map((filter) => (
                <NavDropdown.Item onClick={handleFilter} name={filter}>
                  {filterNameMapper[filter]}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <FormControl
              value={query[activeFilter]}
              onChange={handleChange}
              onKeyPress={this.handleKeyPress}
              type="text"
              placeholder="Search"
              className="mr-sm-2"
            />
            <Button variant="outline-success" onClick={onSubmit}>
              Search
            </Button>
          </div>
          <div className={styles.filterBox}>
            {Object.keys(query).map(
              (filter) =>
                query[filter] && (
                  <span className={styles.queryBlock} name={filter}>
                    <sub>({filter})</sub>
                    {query[filter]}
                    <button
                      className={styles.removeQueryBtn}
                      name={filter}
                      onClick={removeQuery}
                    >
                      X
                    </button>
                  </span>
                )
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Navigation;
