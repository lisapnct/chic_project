import React from "react";
import ProfileContainer from "../components/Profile/ProfileContainer";
import ProjectList from "../components/Project/ProjectList";

const Profile = (props) => {
  return (
    <div className="dashboard-container">
      <div className="left-block">
        <div className="left-grid-container">
          <div className="left-block-top">
            <h2 className="title is-4">projects you supported</h2>
          </div>
          <ProjectList />
        </div>
      </div>
      <div className="right-block">
        <ProfileContainer />
      </div>
    </div>
  );
};

export default Profile;
