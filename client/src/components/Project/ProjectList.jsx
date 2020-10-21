import React from "react";
import ProjectCard from "./ProjectCard";

class ProjectList extends React.Component {
  render() {
    const props = this.props;
    return (
      <React.Fragment>
        {/* {props.isStoreSelected && (
          <div>
            <button
              className="button is-primary is-light"
              onClick={props.handleResetClick}
            >
              Display all
            </button>
          </div>
        )} */}
        <div className="card-list">
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
                store_id={project.store}
                displayProject={props.currentProject}
              />
            </React.Fragment>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default ProjectList;
