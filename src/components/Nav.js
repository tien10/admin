import React, { Component } from "react";

import { Link } from "react-router-dom";

export default class Nav extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleLogout = () => {
    localStorage.removeItem("token");
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <header>
          <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <h1 className="navbar-brand">Dashboard</h1>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to="/users">
                    Users <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link" to="/products">
                    Products <span className="sr-only">(current)</span>
                  </Link>
                </li>
              </ul>
            </div>
            <button
              onClick={this.handleLogout}
              type="submit"
              className="btn btn-primary"
              style={{ width: 100 }}
            >
              Logout
            </button>
          </nav>
        </header>
      </div>
    );
  }
}
