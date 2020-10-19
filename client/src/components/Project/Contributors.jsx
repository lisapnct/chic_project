import React from "react";

class Contributors extends React.Component {
  displayContributors = () => {
    if (this.props.contributors.length === 0) {
      return (
        <div>
          <p>No contributor yet, be the first!</p>
          {/* <button className="button is-primary">contribute now</button> */}
        </div>
      );
    } else {
      return this.props.contributors.map((contributor) => (
        <div key={contributor._id}>
          <h2>Name: {contributor.id_user.userName}</h2>
          <p>
            contributed with:
            {contributor.contributed_materials.map((material) => (
              <span key={material.fabric_type}>
                {material.quantity} piece(s) of {material.fabric_type}
              </span>
            ))}
          </p>
        </div>
      ));
    }
  };

  render() {
    return (
      <div>
        <h1>contributors</h1>
        {this.props.contributors && this.displayContributors()}
      </div>
    );
  }
}

export default Contributors;
