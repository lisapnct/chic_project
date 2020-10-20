import React from "react";
import "../../styles/ProfileContainer.scss";
import FormUser from "../Forms/FormUser";
import PointsCounter from "./PointsCounter";
import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";
import { Link } from "react-router-dom";

class ProfileContainer extends React.Component {
  state = {
    edit_profile: false,
  };

  updateUserProfile = (data) => {
    // console.log(data);
    const fd = new FormData();
    for (let key in data) {
      fd.append(key, data[key]);
    }
    apiHandler
      .updateOne(`/api/users/${this.props.context.user._id}`, fd)
      .then((apiRes) => {
        this.props.context.setUser(apiRes.data);
        this.toggleEditState();
      })
      .catch((err) => console.log(err));
  };

  toggleEditState = () => {
    this.setState((prevState) => ({
      edit_profile: !prevState.edit_profile,
    }));
  };

  renderBottomComponent = () => {
    return this.state.edit_profile ? (
      <FormUser
        userName={this.props.context.user.userName}
        email={this.props.context.user.email}
        address={this.props.context.user.address}
        profilePicture={this.props.context.user.profilePicture}
        updateProfile={this.updateUserProfile}
        cancelEdit={this.toggleEditState}
      />
    ) : (
      <PointsCounter />
    );
  };

  render() {
    return (
      <div className="profile-grid-container">
        <Link to="/">
          <span className="delete is-medium"></span>
        </Link>
        <div className="top-block">
          <figure className="image is-128x128">
            <img
              className="is-rounded"
              src={this.props.context.user.profilePicture}
              alt={`${this.props.context.user.userName}-profile-pic`}
            />
          </figure>
          <h1 className="has-text-dark-gray bold">
            {this.props.context.user.userName}
          </h1>
          <h3>{this.props.context.user.email}</h3>
          <h3>{this.props.context.user.address}</h3>
          {!this.state.edit_profile && (
            <button
              onClick={this.toggleEditState}
              className="button is-primary is-outlined edit-profile-btn"
            >
              <span>
                edit <i className="fas fa-user-edit"></i>
              </span>
            </button>
          )}
        </div>

        <hr />

        <div className="bottom-block">{this.renderBottomComponent()}</div>
      </div>
    );
  }
}

export default withUser(ProfileContainer);
