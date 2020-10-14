import React from "react";
import ProfileContainer from "../components/Profile/ProfileContainer";
import Searchbar from "../components/Searchbar";
import ProjectCard from "../components/Project/ProjectCard";

const Profile = (props) => {
  return (
    <div className="dashboard-container">
      <div className="left-block">
        <div className="left-grid-container">
          <div className="searchbar">
            <Searchbar />
          </div>
          <div className="card-list">
            <div className="card">
              <ProjectCard />
            </div>
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
