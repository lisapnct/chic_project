import React from "react";

class Contributors extends React.Component {
  displayContributors = () => {
    if (this.props.contributors.length === 0) {
      return (
        <div>
          <p>No contributor yet, be the first!</p>
        </div>
      );
    } else {
      return this.props.contributors.map((contributor) => (
        <div key={contributor._id} className="contributor-item">
          <figure className="image is-96x96">
            <img
              className="is-rounded"
              src={contributor.id_user.profilePicture}
              alt="contributor"
            />
          </figure>
          <span>{contributor.id_user.userName}</span>
        </div>
      ));
    }
  };

  render() {
    return (
      <React.Fragment>
        <h3 className="has-text-dark-gray bold">Contributors:</h3>
        <div className="contributors-container">
          {this.props.contributors && this.displayContributors()}
        </div>
      </React.Fragment>
    );
  }
}

export default Contributors;
