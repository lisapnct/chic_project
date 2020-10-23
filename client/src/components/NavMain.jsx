import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
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
            <h1 className="title is-3 has-text-dark logo">
              ch<i className="fas fa-socks has-text-primary"></i>c.
            </h1>
          </NavLink>
        </div>
        <div className="navbar-item">
          {context.isLoggedIn && context.user.role === "designer" && (
            <Link to="/create/project">
              <button className="button is-primary btn-scale-hover bold">
                <i className="fas fa-plus"></i>  create project
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start"></div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {context.isLoggedIn && (
                <React.Fragment>
                  <h2 className="button is-light has-text-dark bold">
                    <NavLink to="/profile">
                      {context.user && context.user.userName} |{" "}
                      {context.user && context.user.paillettes}{" "}
                      <i className="fas fa-fire has-text-dark"></i>
                    </NavLink>
                  </h2>
                  <NavLink
                    to="/signin"
                    className="button is-primary is-light"
                    onClick={handleLogout}
                  >
                    <i className="fas fa-power-off"></i>
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
