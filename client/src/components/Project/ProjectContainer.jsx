import React from "react";
import "../../styles/ProjectContainer.scss";
import { Link } from "react-router-dom";
import Progress from "./Progress";
import Contributors from "./Contributors";
import FormContribution from "../Forms/FormContribution";

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
          <Link to="/">
            <div className="delete is-large"></div>
          </Link>
          <h1>{this.props.project.name}</h1>
          <h3>{this.props.project.description}</h3>
          <h4>Needed materials:</h4>
          {this.props.project.materials &&
            this.props.project.materials.map((material) => (
              <React.Fragment key={material._id}>
                <p>{material.fabric_type}</p>
                <p>{material.color}</p>
                <p>required quantity: {material.required_quantity}</p>
                <p>collected quantity: {material.collected_quantity}</p>
              </React.Fragment>
            ))}
        </div>
        <div className="progress-gauge">
          <Progress
            isSuccess={this.props.project.isSuccess}
            materials={this.props.project.materials}
          />
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
