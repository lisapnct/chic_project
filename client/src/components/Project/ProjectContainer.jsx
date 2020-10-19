import React from "react";
import "../../styles/ProjectContainer.scss";
import { Link } from "react-router-dom";
import Progress from "./Progress";
import Contributors from "./Contributors";
import FormContribution from "../Forms/FormContribution";
import DayJS from "react-dayjs";
import CircleProgressBar from "../Tools/CircleProgressBar";

class ProjectContainer extends React.Component {
  state = {
    isContributing: false,
  };

  displayContributionForm = () => {
    this.setState((prevState) => ({
      isContributing: !prevState.isContributing,
    }));
  };

  render() {
    return (
      <div className="project-grid-container">
        <div className="project-info">
          <div className="project-infos-header">
            <Link to="/">
              <span className="delete close-btn"></span>
            </Link>
            <h1 className="bold has-text-dark-gray">
              {this.props.project.name}
            </h1>
            <p>
              launched by{" "}
              <span className="tag is-info is-light">
                {/* {this.props.project.creator.userName} */} username
              </span>{" "}
              | deadline:{" "}
              <span className="tag is-warning is-light">
                <DayJS format="MMMM D, YYYY">
                  {this.props.project.deadline}
                </DayJS>
              </span>
            </p>
            <div className="project-description">
              <i className="fas fa-quote-left has-text-grey-lighter fa-lg"></i>
              <p>
                <i>{this.props.project.description}</i>
              </p>
              <i className="fas fa-quote-right has-text-grey-lighter fa-lg"></i>
            </div>
            <div className="project-location">
              <p className="has-text-dark-gray bold">Drop your items here:</p>
              {this.props.store.location && (
                <React.Fragment>
                  <span>
                    <i className="fas fa-store-alt has-text-primary"></i>{" "}
                    {this.props.store.name}
                  </span>
                  <span>
                    <i className="fas fa-map-marker-alt has-text-primary"></i>{" "}
                    {this.props.store.location.formattedAddress}
                  </span>
                </React.Fragment>
              )}
            </div>
            <Progress
              isSuccess={this.props.project.isSuccess}
              materials={this.props.project.materials}
            />
          </div>
          {!this.state.isContributing && (
            <button
              onClick={this.displayContributionForm}
              className="button is-primary is-rounded contribute-btn"
            >
              contribute
            </button>
          )}
        </div>
        <hr />

        <div className="bottom-container">
          {this.state.isContributing ? (
            <FormContribution
              project={this.props.project}
              goBack={this.displayContributionForm}
              handleContributionForm={this.props.handleContributionFormSubmit}
            />
          ) : (
            <React.Fragment>
              <h3 className="has-text-dark-gray bold">Required materials:</h3>
              <div className="circle-gauges-container">
                {this.props.project.materials &&
                  this.props.project.materials.map((material) => (
                    <CircleProgressBar key={material._id} material={material} />
                  ))}
              </div>
              <hr />
              <Contributors contributors={this.props.project.contributors} />
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default ProjectContainer;
