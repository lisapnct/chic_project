import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = () => {
  return (
    <div>
      <h1>project card</h1>
      <Link to="/project">this project</Link>
    </div>
  );
};

export default ProjectCard;
