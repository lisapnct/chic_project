import React from "react";
import "../../styles/ProjectContainer.scss";
import { Link } from "react-router-dom";
import Progress from "./Progress";
import Contributors from "./Contributors";
import FormContribution from "../Forms/FormContribution";
import DateFormat from "../Tools/DateFormat";
import CircleProgressBar from "../Tools/CircleProgressBar";
import apiHandler from "../../api/apiHandler";

class ProjectContainer extends React.Component {
  state = {
    isContributing: false,
    contributionDone: false,
    currentProject: "",
  };

  componentDidMount = () => {
    if (this.props.project.length === 0)
      this.getSelectedProject(this.props.match.params.id);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location !== prevProps.location) {
      // console.log("change location");
      this.setState({
        contributionDone: false,
      });
    }
  }

  getSelectedProject = (projectId) => {
    apiHandler
      .getOne("/api/projects/", projectId)
      .then((apiRes) => {
        this.setState({
          currentProject: apiRes.data,
        });
      })
      .catch((err) => console.log(err));
  };

  displayContributionForm = () => {
    this.setState((prevState) => ({
      isContributing: !prevState.isContributing,
    }));
  };

  displaySuccessMessage = () => {
    this.setState((prevState) => ({
      contributionDone: !prevState.contributionDone,
    }));
  };

  render() {
    let project;
    this.props.project.length === 0
      ? (project = this.state.currentProject) 
      : (project = this.props.project);
    return (
      <div className="project-grid-container">
        <div className="project-info">
          <div className="project-infos-header">
            <Link to="/">
              <span className="delete close-btn is-medium"></span>
            </Link>
            <h1 className=" has-text-dark main-title">{project.name}</h1>
            <div>
              launched by{" "}
              {project.creator && (
                <span className="tag is-primary is-light">
                  {project.creator.userName}
                </span>
              )}{" "}
              | deadline:{" "}
              {project.deadline && (
                <div className="tag is-warning is-light">
                  <DateFormat format="MMMM D, YYYY" date={project.deadline} />
                </div>
              )}
            </div>
            <div className="project-description">
              <i className="fas fa-quote-left has-text-primary-light fa-lg"></i>
              <p>
                <i>{project.description}</i>
              </p>
              <i className="fas fa-quote-right has-text-primary-light fa-lg"></i>
            </div>
            <div className="project-location">
              <h3 className="has-text-dark bold">Drop your items here:</h3>
              {this.props.store.location && (
                <React.Fragment>
                  <p>
                    <i className="fas fa-store-alt has-text-primary"></i>{" "}
                    {this.props.store.name}
                  </p>
                  <p>
                    <i className="fas fa-map-marker-alt has-text-primary"></i>{" "}
                    {this.props.store.location.formattedAddress}
                  </p>
                </React.Fragment>
              )}
              {this.state.currentProject && (
                <React.Fragment>
                  <p>
                    <i className="fas fa-store-alt has-text-primary"></i>{" "}
                    {project.store.name}
                  </p>
                  <p>
                    <i className="fas fa-map-marker-alt has-text-primary"></i>{" "}
                    {project.store.location.formattedAddress}
                  </p>
                </React.Fragment>
              )}
            </div>
            <Progress
              isSuccess={project.isSuccess}
              materials={project.materials}
            />
          </div>
          {!this.state.isContributing && project.isSuccess === false && (
            <button
              onClick={this.displayContributionForm}
              className="button bold is-primary contribute-btn btn-scale-hover"
            >
              contribute
            </button>
          )}
        </div>
        <hr />

        <div className="bottom-container">
          {this.state.isContributing ? (
            <FormContribution
              project={project}
              goBack={this.displayContributionForm}
              contributionDone={this.displaySuccessMessage}
              handleContributionForm={this.props.handleContributionFormSubmit}
            />
          ) : project.isSuccess ? (
            <div className="success-container">
              <div className="success-image">
                <img
                  className="illu-gift"
                  src="/success-illu.svg"
                  alt="illu-success"
                />
              </div>
              <div className="success-message">
                <h2 className="has-text-dark bold">Well done!</h2>
                <p>This project found all required materials.</p>
                <p>
                  <span className="tag is-primary is-light">
                    {project.creator.userName}
                  </span>{" "}
                  will be able to launch it!
                </p>
                <br />
                <span>
                  Thanks for your support{" "}
                  <i className="fas fa-heart has-text-grey"></i>
                </span>
              </div>
            </div>
          ) : this.state.contributionDone === true ? (
            <div className="success-container">
              <div className="success-message contribution">
                <h2 className="has-text-dark bold">
                  Thanks for your contribution!
                </h2>
                <p>
                  Next step: give the number{" "}
                  <span className="tag is-warning is-light">324</span> when
                  dropping your item(s) at{" "}
                  <b>
                    <i className="fas fa-store-alt"></i> {this.props.store.name}
                  </b>
                </p>
                <div className="btn-ok-container">
                  <button
                    onClick={() => this.displaySuccessMessage()}
                    className="button is-primary btn-scale-hover"
                  >
                    OK
                  </button>
                </div>
              </div>
              <div className="success-image">
                <img
                  className="illu-gift"
                  src="/contribution-done.svg"
                  alt="illu-success-contribution"
                />
              </div>
            </div>
          ) : (
            <React.Fragment>
              <h3 className="has-text-dark bold">Required materials:</h3>
              <div className="circle-gauges-container">
                {project.materials &&
                  project.materials.map((material) => (
                    <CircleProgressBar key={material._id} material={material} />
                  ))}
              </div>
              <hr />
              <Contributors contributors={project.contributors} />
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default ProjectContainer;
