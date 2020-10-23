import React, { Component } from "react";
import { withUser } from "../Auth/withUser";

class FormUser extends Component {
  state = {
    userName: this.props.userName,
    email: this.props.email,
    address: this.props.address,
  };

  handleChange = (event) => {
    const value =
      event.target.type === "file"
        ? event.target.files[0]
        : event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    const key = event.target.name;
    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.updateProfile(this.state);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label className="label">Profile picture</label>
        <div className="file is-small">
          <label className="file-label">
            <input
              className="file-input"
              type="file"
              name="profilePicture"
              onChange={this.handleChange}
            />
            <span className="file-cta">
              <span className="file-icon">
                <i className="fas fa-upload"></i>
              </span>
              <span className="file-label">Choose a file…</span>
            </span>
          </label>
        </div>

        <br />

        <div className="field">
          <label className="label">Username</label>
          <div className="control has-icons-left">
            <input
              className="input"
              type="text"
              name="userName"
              placeholder="e.g Alex Smith"
              onChange={this.handleChange}
              value={this.state.userName}
            />
            <div className="icon is-small is-left">
              <i className="fas fa-user"></i>
            </div>
          </div>
        </div>

        <br />

        <div className="field">
          <label className="label">Email</label>
          <div className="control has-icons-left">
            <input
              className="input"
              type="email"
              name="email"
              value={this.state.email}
              placeholder="e.g. alexsmith@gmail.com"
              onChange={this.handleChange}
            />
            <div className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </div>
          </div>
        </div>

        <br />

        <div className="field is-grouped is-grouped-right">
          <p className="control">
            <button className="button is-primary">Save</button>
          </p>
          <p className="control">
            <span
              onClick={() => this.props.cancelEdit()}
              className="button is-light"
            >
              Cancel
            </span>
          </p>
        </div>
      </form>
    );
  }
}

export default withUser(FormUser);
