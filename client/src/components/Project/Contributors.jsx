import React from "react";

const Contributors = (props) => {
  return (
    <div>
      <h1>contributors</h1>

      {props.contributors &&
        props.contributors.map((contributor) => (
          <div key={contributor._id}>
            <h2>Name: {contributor.id_users[0].userName}</h2>
            <p>
              contributed with:
              {contributor.contributed_materials.map((material) => (
                <span key={material.fabric_type}>
                  {material.quantity} piece(s) of {material.fabric_type}
                </span>
              ))}
            </p>
          </div>
        ))}
    </div>
  );
};

export default Contributors;
