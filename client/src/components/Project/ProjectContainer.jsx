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
            <h1 className="bold has-text-dark-gray">
              {this.props.project.name}
            </h1>
            <p>
              launched by <span className="tag is-info is-light">lisapnct</span>
            </p>
            <div className="project-description">
              <i className="fas fa-quote-left has-text-grey-lighter fa-lg"></i>
              <p>{this.props.project.description}</p>
              <i className="fas fa-quote-right has-text-grey-lighter fa-lg"></i>
            </div>
            <div className="project-location">
              {this.props.store.location && (
                <React.Fragment>
                  <span>
                    <i className="fas fa-store-alt has-text-grey"></i>{" "}
                    {this.props.store.name}
                  </span>
                  <span>
                    <i className="fas fa-map-marker-alt has-text-grey"></i>{" "}
                    {this.props.store.location.formattedAddress}
                  </span>
                </React.Fragment>
              )}
            </div>
            <div className="tag is-warning is-light">
              <DayJS format="MMMM D, YYYY">{this.props.project.deadline}</DayJS>
            </div>
            <div className="progress-gauge">
              <Progress
                isSuccess={this.props.project.isSuccess}
                materials={this.props.project.materials}
              />
            </div>
            <hr />
            <h4>Needed materials:</h4>
            <div className="circle-gauges-container">
              {this.props.project.materials &&
                this.props.project.materials.map((material) => (
                  <CircleProgressBar material={material} />
                ))}
            </div>
            <hr/>
          </div>
          <Link to="/">
            <div className="delete is-large"></div>
          </Link>
        </div>
        <div className="contributors">
          {this.state.isContributing ? (
            <FormContribution
              project={this.props.project}
              goBack={this.displayContributionForm}
              handleContributionForm={this.props.handleContributionFormSubmit}
            />
          ) : (
            <React.Fragment>
              <Contributors contributors={this.props.project.contributors} />
              <button
                onClick={this.displayContributionForm}
                className="button is-primary"
              >
                contribute
              </button>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default ProjectContainer;
