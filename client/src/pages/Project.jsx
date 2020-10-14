import React from "react";
import Searchbar from "../components/Searchbar";
import ProjectCard from "../components/Project/ProjectCard";
import ProjectContainer from "../components/Project/ProjectContainer";


const Project = () => {
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
        <ProjectContainer />
      </div>
    </div>
  );
};

export default Project;
