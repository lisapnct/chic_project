import React from "react";
import ContributionCard from "./ContributionCard";

const ContributionsList = (props) => {
  return (
    <div className="card-list">
      {props.projects.map((project) => (
        <ContributionCard key={project._id} project={project} />
      ))}
    </div>
  );
};

export default ContributionsList;
