import React from "react";
import ProjectCard from "./ProjectCard";

class ProjectList extends React.Component {
  // turn it into class to create a handle click calling props.displayProject

//  componentDidMount() {
//     // console.log("clicked");
//     this.props.displayProject();
//   };

  render() {
    return (
      <div className="card-list">
        {this.props.projects.map((project) => (
          <ProjectCard
            key={project._id}
            id={project._id}
            name={project.name}
            description={project.description}
            creator={project.creator}
            materials={project.materials}
            displayProject={this.props.oneProject}
          />
        ))}
      </div>
    );
  }
}

export default ProjectList;
