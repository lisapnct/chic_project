import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = (props) => {
  return (
    <div className="item-card" onClick={() => props.displayProject(props.id)}>
      <Link to={`/project/${props.id}`}>
        <h1>
          {props.name} by {props.creator}
        </h1>
        <p>{props.description}</p>
        <h3>Materials:</h3>
        {props.materials.map((material) => (
          <ul key={material._id}>
            <li>type: {material.fabric_type}</li>
            <li>required quantity: {material.required_quantity}</li>
            <li>collected: {material.collected_quantity}</li>
          </ul>
        ))}
        {/* <button className="button is-primary">contribute</button> */}
      </Link>
    </div>
  );
};

export default ProjectCard;
