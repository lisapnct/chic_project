import React from "react";
import "../styles/Dashboard.css";
import { Switch, Route } from "react-router-dom";
import Searchbar from "../components/Searchbar";
import Map from "../components/Map";
import ProjectContainer from "../components/Project/ProjectContainer";
import ProfileContainer from "../components/Profile/ProfileContainer";
import ProjectCard from "../components/Project/ProjectCard";

const Dashboard = () => {
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
  
        <Map />
        {/* OR */}
        {/* <ProjectContainer /> */}
        {/* OR */}
        {/* <ProfileContainer /> */}
      </div>
    </div>
  );
};

export default Dashboard;
