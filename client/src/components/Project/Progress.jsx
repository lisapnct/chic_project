import React from "react";

const Progress = (props) => {
  return (
    <div>
      <h1>progress</h1>
      {props.isSuccess && <p>yay!!!</p>}
      {props.materials &&
        props.materials.map((material) => (
          <p>
            {" "}
            still needs{" "}
            {material.required_quantity - material.collected_quantity} piece(s)
            of {material.fabric_type}
          </p>
        ))}
    </div>
  );
};

export default Progress;
