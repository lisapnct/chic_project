import React, { Component } from "react";
import { withUser } from "../Auth/withUser";

class FormUser extends Component {
  state = {
    userName: this.props.userName,
    email: this.props.email,
    address: this.props.address,
    profilePicture: this.props.profilePicture,
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

        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="userName"
              placeholder="e.g Alex Smith"
              onChange={this.handleChange}
              value={this.state.userName}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              type="email"
              name="email"
              value={this.state.email}
              placeholder="e.g. alexsmith@gmail.com"
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Address</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="address"
              placeholder="e.g. 40 boulevard Voltaire, Paris"
              onChange={this.handleChange}
              value={this.state.address}
            />
          </div>
          <p className="help">This is a help text</p>
        </div>

        <button className="button is-primary">save</button>
      </form>
    );
  }
}

export default withUser(FormUser);
