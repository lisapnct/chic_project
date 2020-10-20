import React from "react";
import { withUser } from "../Auth/withUser";

const ContributionCard = (props) => {
  return (
    <div className="item-card">
      <div className="card-content-container">
        <div className="left-container">
          <div className="card-img-contribution">
            <i className="fas fa-4x has-text-white-ter fa-hand-holding-heart"></i>
          </div>
          <div className="card-infos">
            <p className="has-text-grey">{props.project.creator.userName}</p>
            <h3 className="has-text-grey-dark bold">{props.project.name}</h3>
            <p>You contributed with:</p>
            <div className="card-tags">
              {props.project.contributors.map((contributor) => {
                if (contributor.id_user._id === props.context.user._id)
                  return contributor.contributed_materials.map((mat) => (
                    <div key={mat._id} className="a-tag tag is-info is-light">
                      {mat.quantity} piece(s) of {mat.fabric_type}
                    </div>
                  ));
                return contributor;
              })}
            </div>
          </div>
        </div>
        <div className="card-state">
          <p className="tag is-warning is-light">
            n°{Math.floor(Math.random() * 2000)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default withUser(ContributionCard);
