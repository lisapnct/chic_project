import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const PointsCounter = () => {
  return (
    <React.Fragment>
      <div className="bottom-block-paillettes">
        <div className="counter">
          <CircularProgressbar
            maxValue="50"
            value="34"
            text="68%"
            styles={buildStyles({
              textColor: "#00D1B2",
              pathColor: "#00D1B2",
            })}
          />
        </div>
        <div className="paillettes-infos">
          <h3 className="bold has-text-dark-gray">
            You collected{" "}
            <span className="tag is-primary is-light">34 paillette(s)</span>
          </h3>
          <p>Only 16 paillette(s) left until next reward!</p>
          <span className="paillettes-rules">
            <i className="fas fa-info-circle has-text-primary"></i> 1 item
            contributed = 1 paillette
          </span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PointsCounter;
