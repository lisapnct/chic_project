import React from "react";
import { NavLink } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";

const NavMain = (props) => {
  const { context } = props;

  function handleLogout() {
    apiHandler
      .logout()
      .then(() => {
        context.removeUser();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="navbar-item">
          <NavLink to="/">
            <h1 className="title is-3 has-text-dark-grey has-text-weight-bold">
             ch<i className="fas fa-socks has-text-info"></i>c
            </h1>
          </NavLink>
          <NavLink
            to="/"
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </NavLink>
        </div>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start"></div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {context.isLoggedIn && (
                <React.Fragment>
                  <div className="button is-white">
                    <NavLink to="/profile">
                      {context.user && context.user.email}
                    </NavLink>
                  </div>
                  <NavLink
                    to="/signin"
                    className="button is-danger is-light"
                    onClick={handleLogout}
                  >
                    Logout
                  </NavLink>
                </React.Fragment>
              )}
              {!context.isLoggedIn && (
                <React.Fragment>
                  <div className="button is-primary is-outlined">
                    <NavLink to="/signin">Log in</NavLink>
                  </div>
                  <div className="button is-primary">
                    <NavLink to="/signup">Create account</NavLink>
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default withUser(NavMain);
