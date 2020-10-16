import React from "react";
import ProjectCard from "./ProjectCard";


const ProjectList = (props) => {

  const fabric_types = [
  'cotton',
   'linen',
   'silk',
   'wool',
   'artificial fibers (polyester, nylon, elastane)'
  ];

  // createCheckboxes = () => (
  //   fabric_types.map(type => console.log(type))
  // )

  

  return (
    <div className="card-list">
      {props.isStoreSelected && (
        <button onClick={props.handleResetClick}>Display all</button>
      )}
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
