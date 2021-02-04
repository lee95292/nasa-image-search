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

const placeholderMapper = {
  title: "Moon",
  total: "First foorprint at the moon.",
  keyword: "Footprint",
  year_start: "1990",
  year_end: "2021",
};

const isEmptyQuery = (q) => {
  let empty = true;
  for (const key of Object.keys(q)) {
    if (q[key]) {
      empty = false;
      break;
    }
  }
  return empty;
};

const queryEmptyMessage = 'queryEmptyMessage'

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
          <div className={styles.filterBox}>
            { isEmptyQuery(query) ? 
            queryEmptyMessage : Object.keys(query).map(
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
            <input
              className={styles.searchInput}
              value={query[activeFilter]}
              onChange={handleChange}
              onKeyPress={this.handleKeyPress}
              type="text"
              placeholder={placeholderMapper[activeFilter]}
            />
            <Button variant="outline-success" onClick={onSubmit}>
              Search
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Navigation;
