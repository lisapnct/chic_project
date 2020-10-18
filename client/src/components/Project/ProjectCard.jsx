import React from "react";
import { Link } from "react-router-dom";
import DayJS from "react-dayjs";
import apiHandler from "../../api/apiHandler";

class ProjectCard extends React.Component {
  state = {
    store_address: "Loading...",
    store_name: "Loading...",
    creator_pic: "Loading...",
  };

  componentDidMount = () => {
    this.getStoreInfo();
    this.getUserInfo();
  };

  getUserInfo = () => {
    apiHandler
      .getOne("/api/users/", this.props.creator._id)
      .then((apiRes) => {
        this.setState({
          creator_pic: apiRes.data.profilePicture,
        });
      })
      .catch((err) => console.log(err));
  };

  getStoreInfo = () => {
    apiHandler
      .getOne("/api/stores/", this.props.store_id)
      .then((apiRes) => {
        console.log(apiRes);
        this.setState({
          store_address: apiRes.data.location.formattedAddress,
          store_name: apiRes.data.name,
        });
      })
      .catch((err) => console.log(err));
  };

  getItemsCollected = () => {
    let qt = 0;
    this.props.materials.map((material) => {
      return (qt += material.collected_quantity);
    });
    return qt;
  };

  getTotalItemsRequired = () => {
    let max = 0;
    this.props.materials.map((material) => {
      return (max += material.required_quantity);
    });
    return max;
  };

  render() {
    console.log(this.props);
    return (
      <div
        className="item-card"
        onClick={() => this.props.displayProject(this.props.id)}
      >
        <Link to={`/project/${this.props.id}`}>
          <div className="card-content-container">
            <div className="left-container">
              <div className="card-img image is-96x96">
                <img
                  class="is-rounded"
                  src={this.state.creator_pic}
                  alt="creator-pic"
                />
              </div>
              <div className="card-infos">
                <p className="has-text-grey">{this.props.creator.userName}</p>
                <h3 className="has-text-grey-dark bold">{this.props.name}</h3>
                <div className="location-container has-text-grey">
                  <span>
                    <i class="fas fa-store-alt has-text-grey"></i>{" "}
                    {this.state.store_name}
                  </span>
                  <span>
                    <i className="fas fa-map-marker-alt has-text-grey"></i>{" "}
                    {this.state.store_address}
                  </span>
                </div>
                <div className="card-tags">
                  {this.props.materials.map((material) => (
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
            <div className="card-state">
              <p className="tag is-warning is-light">
                {this.getItemsCollected()}/{this.getTotalItemsRequired()} items
                collected
              </p>
              <span className="has-text-grey">
                <DayJS format="MMM D, YYYY">{this.props.deadline}</DayJS>
              </span>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default ProjectCard;
