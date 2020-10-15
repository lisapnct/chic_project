import React from "react";
import ProjectCard from "./ProjectCard";

const ProjectList = (props) => {
  return (
    <div className="card-list">
    <button onClick={props.handleResetClick}>Display all</button>
      {props.projects.map((project) => (
        <ProjectCard
          key={project._id}
          id={project._id}
          name={project.name}
          description={project.description}
          creator={project.creator}
          materials={project.materials}
          displayProject={props.currentProject}
        />
      ))}
    </div>
  );
};

export default ProjectList;
