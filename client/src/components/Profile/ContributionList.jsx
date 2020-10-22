import React from "react";
import ContributionCard from "./ContributionCard";
import ProjectCard from "../Project/ProjectCard";

const ContributionsList = (props) => {
  return (
    <div className="card-list">
      {props.listView === "contributions"
        ? props.contributions.map((contribution) => (
            <ContributionCard key={contribution._id} project={contribution} />
          ))
        : props.projects.map((project) => {
            let isSelected = false;
            props.selectedProjectID === project._id
              ? (isSelected = true)
              : (isSelected = false);
            return (
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
                isDeletable={true}
                deleteProject={props.deleteProject}
              />
            );
          })}
    </div>
  );
};

export default ContributionsList;
