import React from "react";
import "../../styles/ProfileContainer.scss";
import FormUser from "../Forms/FormUser";
import PointsCounter from "./PointsCounter";
import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";

class ProfileContainer extends React.Component {
  state = {
    edit_profile: false,
    userName: "",
    email: "",
    address: "",
    profilePicture: "",
  };

  componentDidMount() {
    apiHandler
      .getOne(`/api/users/`, this.props.context.user._id)
      .then((apiRes) => {
        const user = apiRes.data;
        this.setState({
          userName: user.userName,
          email: user.email,
          address: user.address,
          profilePicture: user.profilePicture,
        });
      })
      .catch((err) => console.log(err));
  }

  updateUserProfile = (data) => {
    // console.log(data);
    const fd = new FormData();
    for (let key in data) {
      fd.append(key, data[key]);
    }
    apiHandler
      .updateOne(`/api/users/${this.props.context.user._id}`, fd)
      .then((apiRes) => {
        this.setState({
          userName: data.userName,
          email: data.email,
          address: data.address,
          profilePicture: data.profilePicture,
        });
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
        userName={this.state.userName}
        email={this.state.email}
        address={this.state.address}
        profilePicture={this.state.profilePicture}
        updateProfile={this.updateUserProfile}
      />
    ) : (
      <PointsCounter />
    );
  };

  render() {
    return (
      <div className="profile-grid-container">
        <div className="top-block">
          <figure className="image is-96x96">
            <img
              className="is-rounded"
              src={this.state.profilePicture}
              alt={`${this.state.userName}-profile-pic`}
            />
          </figure>
          <h1>{this.state.userName}</h1>
          <h1>{this.state.email}</h1>
          <h1>{this.state.address}</h1>
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
