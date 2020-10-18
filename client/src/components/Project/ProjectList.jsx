import React from "react";
import ProjectCard from "./ProjectCard";

class ProjectList extends React.Component {
  render() {
    const props = this.props;
    return (
      <div className="card-list">
        {props.isStoreSelected && (
          <button onClick={props.handleResetClick}>Display all</button>
        )}
        {props.projects.map((project) => (
          <React.Fragment key={project._id}>
            <ProjectCard
              key={project._id}
              id={project._id}
              name={project.name}
              description={project.description}
              creator={project.creator}
              materials={project.materials}
              deadline={project.deadline}
              city={project.city}
              displayProject={props.currentProject}
            />
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default ProjectList;
