import React from "react";
import Searchbar from "../components/Searchbar";
import Map from "../components/Map";
import ProjectCard from "../components/Project/ProjectCard";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="left-block">
        <div className="left-grid-container">
          <Searchbar />
          <div className="card-list">
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
          </div>
        </div>
      </div>
      <div className="right-block">
        <Map />
      </div>
    </div>
  );
};

export default Dashboard;
