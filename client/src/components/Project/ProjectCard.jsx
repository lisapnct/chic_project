import React from "react";
import { Link } from "react-router-dom";
import DayJS from "react-dayjs";
import apiHandler from "../../api/apiHandler";
import { withUser } from "../Auth/withUser";

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
    let query;
    this.props.creator._id
      ? (query = this.props.creator._id)
      : (query = this.props.creator);
    apiHandler
      .getOne("/api/users/", query)
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
        this.setState({
          store_address: apiRes.data.location.formattedAddress,
          store_name: apiRes.data.name,
        });
      })
      .catch((err) => console.log(err));
  };

  getItemsCollected = (prop) => {
    let qt = 0;
    prop.materials.map((material) => {
      return (qt += material.collected_quantity);
    });
    return qt;
  };

  getTotalItemsRequired = (prop) => {
    let max = 0;
    prop.materials.map((material) => {
      return (max += material.required_quantity);
    });
    return max;
  };

  render() {
    const selectedStyle = {
      boxShadow: "0px 0px 18px -2.5px rgba(96, 60, 234, 0.35)",
    };
    let collected = this.getItemsCollected(this.props);
    let goal = this.getTotalItemsRequired(this.props);
    let result = String(collected + "/" + goal);

    return (
      <div
        style={
          this.props.isSelected &&
          window.location.pathname.startsWith("/project")
            ? selectedStyle
            : null
        }
        className="item-card"
        onClick={() => {
          this.props.displayProject(this.props.id);
        }}
      >
        <Link to={`/project/${this.props.id}`}>
          <div className="card-content-container">
            <div className="left-container">
              {window.location.pathname === "/profile" ? (
                <div className="card-img">
                  <i className="fas fa-5x has-text-primary-light fa-socks"></i>
                </div>
              ) : (
                <div className="card-img image is-96x96">
                  <img
                    className="is-rounded"
                    src={
                      this.props.image
                        ? this.props.image
                        : this.state.creator_pic
                    }
                    alt="creator-pic"
                  />
                </div>
              )}
              <div className="card-infos">
                <p className="has-text-grey">{this.props.userName}</p>
                <h3 className="has-text-dark main-title">{this.props.name}</h3>
                <div className="location-container has-text-grey">
                  <span>
                    <i className="fas fa-store-alt has-text-grey"></i>{" "}
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
                      className="a-tag tag is-primary is-light"
                    >
                      {material.fabric_type}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="card-state">
              <div className="delete-container">
                {this.props.isDeletable && (
                  <div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        this.props.deleteProject(this.props.id);
                      }}
                      className="button is-small is-danger is-light"
                    >
                      <i className="fas fa-trash"></i> delete
                    </button>
                  </div>
                )}
                {this.props.isSuccess ? (
                  <p className="tag is-success is-light">completed</p>
                ) : (
                  <p className="tag is-warning is-light">
                    {result} items collected
                  </p>
                )}
              </div>

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

export default withUser(ProjectCard);
