import React from "react";
import ProjectCard from "./ProjectCard";

class ProjectList extends React.Component {
  render() {
    const props = this.props;
    return (
      <React.Fragment>
        <div className="card-list">
          {props.projects.map((project) => {
            let isSelected = false;
            this.props.selectedProjectID === project._id
              ? (isSelected = true)
              : (isSelected = false);
            return (
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
                  isSuccess={project.isSuccess}
                  isSelected={isSelected}
                  displayProject={props.currentProject}
                />
              </React.Fragment>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default ProjectList;
