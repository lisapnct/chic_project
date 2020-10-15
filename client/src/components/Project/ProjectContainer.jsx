import React from "react";
import "../../styles/ProjectContainer.scss";

import Progress from "./Progress";
import Contributors from "./Contributors";

const ProjectContainer = (props) => {
  return (
    <div className="project-grid-container">
      <div className="project-info">
        <h1>{props.project.name}</h1>
        <h3>{props.project.description}</h3>
        <h4>Needed materials:</h4>
      </div>
      <div className="progress-gauge">
        <Progress />
      </div>
      <div className="contributors">
        <Contributors />
      </div>
    </div>
  );
};

export default ProjectContainer;
