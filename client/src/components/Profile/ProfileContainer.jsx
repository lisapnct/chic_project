import React from "react";
import "../../styles/ProfileContainer.css";
import FormUser from "../Forms/FormUser";
import PointsCounter from "./PointsCounter";

const ProfileContainer = () => {
  return (
    <div className="profile-grid-container">
      <div class="top-block">
        <p>profile pic</p>
        <h1>Username</h1>
        <p>update profile btn on the right</p>
      </div>
      <div class="bottom-block">
        <FormUser />
        or
        {/* OR */}
        <PointsCounter />
      </div>
    </div>
  );
};

export default ProfileContainer;
