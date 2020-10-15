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
        {props.project.materials &&
          props.project.materials.map((material) => (
            <React.Fragment key={material._id}>
              <p>{material.fabric_type}</p>
              <p>{material.color}</p>
              <p>required quantity: {material.required_quantity}</p>
              <p>collected quantity: {material.collected_quantity}</p>
            </React.Fragment>
          ))}
      </div>
      <div className="progress-gauge">
        <Progress
          isSuccess={props.project.isSuccess}
          materials={props.project.materials}
        />
      </div>
      <div className="contributors">
        <Contributors contributors={props.project.contributors} />
      </div>
    </div>
  );
};

export default ProjectContainer;
