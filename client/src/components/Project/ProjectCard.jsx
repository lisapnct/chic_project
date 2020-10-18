import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = (props) => {
  return (
    <div className="item-card" onClick={() => props.displayProject(props.id)}>
      <Link to={`/project/${props.id}`}>
        <div className="card-content-container">
          <div className="left-container">
            <div className="card-img">
              <i className="fas fa-user-circle has-text-light fas fa-6x"></i>
            </div>
            <div className="card-infos">
              <p className="has-text-grey">{props.creator.userName}</p>
              <h3 className="has-text-grey-dark bold">{props.name}</h3>
              <div className="has-text-grey">
                <p>
                  <i className="fas fa-map-marker-alt "></i> <b></b> Paris,
                  France
                </p>
              </div>
              <div className="card-tags">
                {props.materials.map((material) => (
                  <div className="a-tag tag is-info is-light" key={material.fabric_type}>
                    {material.fabric_type}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="card-state">
            <div className="tag is-warning is-light">9/12 items collected</div>
            <span className="has-text-grey">18 Apr. 2020</span>{" "}
            {/* creation date */}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard;
