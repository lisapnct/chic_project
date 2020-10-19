import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircleProgressBar = (props) => {
  return (
    <React.Fragment>
      <div className="circle-progress-item">
        <CircularProgressbar
          maxValue={props.material.required_quantity}
          value={props.material.collected_quantity}
          text={`${props.material.collected_quantity}/${props.material.required_quantity}`}
          styles={buildStyles({
            textColor: "#00D1B2",
            pathColor: "#00D1B2",
          })}
        />
        <p className="tag legend-circle-progress">{props.material.fabric_type}</p>
      </div>
    </React.Fragment>
  );
};

export default CircleProgressBar;
