import React from "react";
import "../../styles/ProjectContainer.css";

import Progress from "./Progress";
import Contributors from "./Contributors";

const ProjectContainer = () => {
  return (
    <div className="project-grid-container">
      <div class="project-info">
        <h1>Project Name</h1>
        <h3>Description</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta ipsum,
          a in quia error quam tempore deleniti iusto nostrum rerum magnam atque
          laboriosam neque expedita exercitationem eligendi, omnis tempora
          quaerat.
        </p>
        <h4>Needed materials</h4>
      </div>
      <div class="progress-gauge">
        <Progress />
      </div>
      <div class="contributors">
        <Contributors />
      </div>
    </div>
  );
};

export default ProjectContainer;
