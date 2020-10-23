import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { withUser } from "../../components/Auth/withUser";
import "react-circular-progressbar/dist/styles.css";

const PointsCounter = (props) => {
  const goal = 80;

  return (
    <React.Fragment>
      <div className="bottom-block-paillettes">
        <div className="counter">
          <CircularProgressbar
            maxValue={goal}
            value={props.context.user.paillettes}
            text={`${Math.round(
              (props.context.user.paillettes / goal) * 100
            )}%`}
            styles={buildStyles({
              textColor: "#603CEA",
              pathColor: "#603CEA",
            })}
          />
        </div>
        <div className="paillettes-infos">
          <h2 className="bold has-text-dark">
            You collected{" "}
            <span className="tag is-primary is-light">
              {props.context.user.paillettes} paillette(s) 
              <i className="fas fa-fire"></i>{" "}
            </span>
          </h2>
          <h3>
             <i className="fas fa-gifts"></i> Only{" "}
            {goal - props.context.user.paillettes} paillette(s) left until next
            reward!
          </h3>
          
          <p className="paillettes-rules">
            <i className="fas fa-info-circle has-text-primary"></i> 1 item
            contributed = 1 paillette
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withUser(PointsCounter);
