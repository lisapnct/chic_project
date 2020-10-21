import React from "react";
import "../../styles/ProjectContainer.scss";
import { Link } from "react-router-dom";
import Progress from "./Progress";
import Contributors from "./Contributors";
import FormContribution from "../Forms/FormContribution";
import DateFormat from '../Tools/DateFormat';
import CircleProgressBar from "../Tools/CircleProgressBar";
import apiHandler from "../../api/apiHandler";

class ProjectContainer extends React.Component {
  state = {
    isContributing: false,
    currentProject: '',
  };

  componentDidMount = () => {
    if (this.props.project.length === 0)this.getSelectedProject(this.props.match.params.id)
  }

  getSelectedProject = (projectId) => {
    apiHandler
      .getOne("/api/projects/", projectId)
      .then((apiRes) => {
        this.setState({
          currentProject : apiRes.data,
        });
      })
      .catch((err) => console.log(err));
  };

  displayContributionForm = () => {
    this.setState((prevState) => ({
      isContributing: !prevState.isContributing,
    }));
  };

  render() {
    let project; 
    this.props.project.length === 0 ? project = this.state.currentProject : project = this.props.project;
    return (
      <div className="project-grid-container">
        <div className="project-info">
          <div className="project-infos-header">
            <Link to="/">
              <span className="delete close-btn is-medium"></span>
            </Link>
            <h1 className="bold has-text-dark-gray">
              {project.name}
            </h1>
            <p>
              launched by{" "}
              {project.creator && (
                <span className="tag is-info is-light">
                  {project.creator.userName}
                </span>
              )}{" "}
              | deadline:{" "}
              {project.deadline && (
                <span className="tag is-warning is-light">
                  <DateFormat format="MMMM D, YYYY" date={project.deadline}/>
                </span>
              )}
            </p>
            <div className="project-description">
              <i className="fas fa-quote-left has-text-grey-lighter fa-lg"></i>
              <p>
                <i>{project.description}</i>
              </p>
              <i className="fas fa-quote-right has-text-grey-lighter fa-lg"></i>
            </div>
            <div className="project-location">
              <h3 className="has-text-dark-gray bold">Drop your items here:</h3>
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
            </div>
            <Progress
              isSuccess={project.isSuccess}
              materials={project.materials}
            />
          </div>
          {!this.state.isContributing && project.isSuccess === false && (
            <button
              onClick={this.displayContributionForm}
              className="button is-primary contribute-btn"
            >
              contribute
            </button>
          )}
          {project.isSuccess && (
            <>
              <h3><span role="img" aria-label="congratulation">🙌</span> We did it! <span role="img" aria-label="congratulation">💪</span>Thank you!!!</h3>
            </> 
          )}
        </div>
        <hr />

        <div className="bottom-container">
          {this.state.isContributing ? (
            <FormContribution
              project={project}
              goBack={this.displayContributionForm}
              handleContributionForm={this.props.handleContributionFormSubmit}
            />
          ) : (
            <React.Fragment>
              <h3 className="has-text-dark-gray bold">Required materials:</h3>
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
