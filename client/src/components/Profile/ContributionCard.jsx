import React from "react";

{
  /* componentDidMount() =
             this.props.project.contributors.map(contributor => {
                if (contributor.blablaID === context.user.id) {
                    setState({
                        // contrib info
                    })
                }
            }) */
}

const ContributionCard = (props) => {
  return (
    <div className="item-card">
      <div className="card-content-container">
        <div className="left-container">
          <div className="donation-logo">
            <i class="fas fa-4x has-text-white-ter fa-hand-holding-heart"></i>
          </div>
          <div className="card-infos">
            <p className="has-text-grey">{props.project.creator.userName}</p>
            <h3 className="has-text-grey-dark bold">{props.project.name}</h3>
            <p>You contributed with:</p>
            <div className="card-tags">
              {props.project.materials.map((material) => (
                <div
                  key={material.fabric_type}
                  className="a-tag tag is-info is-light"
                >
                  {material.fabric_type}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* card with props.project.name */}
      {/* use this.state.xx for the rest */}
    </div>
  );
};

export default ContributionCard;
