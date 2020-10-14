import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = () => {
  return (
    <div className="item-card">
      <Link to="/project">
        <h1>project card</h1>
      </Link>
    </div>
  );
};

export default ProjectCard;
