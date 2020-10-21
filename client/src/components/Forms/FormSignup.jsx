import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import { Link } from "react-router-dom";
import apiHandler from "../../api/apiHandler";

class FormSignup extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    password: "",
    userName: "",
    role: "user",
  };

  handleChange = (event) => {
    const value =
      event.target.type === "file"
        ? event.target.files[0]
        : event.target.type === "checkbox"
        ? event.target.checked
        : event.target.type === "radio"
        ? event.target.id
        : event.target.value;

    const key = event.target.name;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signup(this.state)
      .then((data) => {
        this.context.setUser(data);
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ message: error });
      });
  };

  render() {
    console.log(this.state.message);
    return (
      <React.Fragment>
        <h1 className="title is-4">Create an account</h1>
        <p className="description">
          We need a few informations about you. Who are you?
        </p>

        <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <div className="control">
            <label
              className={
                this.state.role === "designer"
                  ? "is-primary tag is-large radio role-radio"
                  : "tag is-large radio role-radio"
              }
            >
              <input
                onChange={this.handleChange}
                type="radio"
                name="role"
                id="designer"
                checked={this.state.role === "designer" ? true : false}
              />
              Designer
            </label>
            <label
              className={
                this.state.role === "user"
                  ? "is-primary tag is-large radio role-radio"
                  : "tag is-large radio role-radio"
              }
            >
              <input
                onChange={this.handleChange}
                id="user"
                type="radio"
                name="role"
                checked={this.state.role === "user"}
              />
              User
            </label>
          </div>
          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input"
                type="text"
                id="username"
                name="userName"
                placeholder="Username"
                required={true}
              />
              <div className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </div>
            </div>
          </div>

          {this.state.message && (
            <React.Fragment>
              <p className="has-text-danger">
                <i class="fas fa-exclamation-triangle"></i> This email already
                exists
              </p>{" "}
              <br />
            </React.Fragment>
          )}

          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required={true}
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
                required={true}
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
            <span>Already have an account? Signin</span>{" "}
            <Link to="/signin">
              <span className="has-text-primary">here.</span>
            </Link>
          </small>
        </form>
      </React.Fragment>
    );
  }
}

export default withRouter(FormSignup);
