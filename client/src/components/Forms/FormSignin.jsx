import React, { Component } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import { withRouter } from "react-router-dom";
import apiHandler from "../../api/apiHandler";

class FormSignin extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const key = event.target.name;

    const value =
      event.target.type === "file"
        ? event.target.files[0]
        : event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signin(this.state)
      .then((data) => {
        this.context.setUser(data);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        this.setState({ message: error });
      });
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="title is-4">Sign in</h1>
        <p className="description">Welcome back!</p>

        {this.state.message && (
          <React.Fragment>
            <p className="has-text-danger">
              <i className="fas fa-exclamation-triangle"></i> Invalid
              credentials
            </p>{" "}
            <br />
          </React.Fragment>
        )}

        <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
              />
              <div className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
              />
              <div className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </div>
            </div>
          </div>

          <button className="button is-block is-primary is-fullwidth">
            Submit
          </button>
          <br />
          <small>
            <span>Not account yet? Signup</span>{" "}
            <Link to="/signup">
              <span className="has-text-primary">now.</span>
            </Link>
          </small>
        </form>
      </React.Fragment>
    );
  }
}

export default withRouter(FormSignin);
