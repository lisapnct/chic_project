import React from "react";
import "../../styles/ProfileContainer.scss";
import FormUser from "../Forms/FormUser";
import PointsCounter from "./PointsCounter";
import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";

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
    // console.log("edit state");
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
      />
    ) : (
      <PointsCounter />
    );
  };

  render() {
    console.log(this.props);
    return (
      <div className="profile-grid-container">
        <div className="top-block">
          <figure className="image is-96x96">
            <img
              className="is-rounded"
              src={this.props.context.user.profilePicture}
              alt={`${this.props.context.user.userName}-profile-pic`}
            />
          </figure>
          <h1>{this.props.context.user.userName}</h1>
          <h1>{this.props.context.user.email}</h1>
          <h1>{this.props.context.user.address}</h1>
          {!this.state.edit_profile && (
            <button onClick={this.toggleEditState} className="button">
              edit profile
            </button>
          )}
        </div>
        <div className="bottom-block">{this.renderBottomComponent()}</div>
      </div>
    );
  }
}

export default withUser(ProfileContainer);
