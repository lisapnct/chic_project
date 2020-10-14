import React from "react";
import ProfileContainer from "../components/Profile/ProfileContainer";
import ProjectCard from "../components/Project/ProjectCard";

const Profile = (props) => {
  return (
    <div className="dashboard-container">
      <div className="left-block">
        <div className="left-grid-container">
          <div className="left-block-top">
            <h2>projects you supported</h2>
          </div>
          <div className="card-list">
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
          </div>
        </div>
      </div>
      <div className="right-block">
        <ProfileContainer />
      </div>
    </div>
  );
};

export default Profile;
