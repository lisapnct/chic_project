import React, { Component } from "react";
import Checkbox from "./Tools/Checkbox";
import LocationAutoComplete from "./Tools/LocationAutocomplete";

const fabric_types = ["cotton", "linen", "silk", "wool", "artificial fibers"];

class Searchbar extends Component {
  state = {
    fabric_types: [],
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState !== this.state) {
      this.filterByFabric();
    }
  };

  filterByFabric = () => {
    if (this.state.fabric_types.length === 0 && !this.props.isStoreSelected) {
      this.props.displayAllProjects();
    } else {
      this.props.filterByFabricType(this.state.fabric_types);
    }
  };

  handleCheckChanges = (label) => {
    const labelStr = String(label);
    const fabricArr = this.state.fabric_types;
    if (fabricArr.length === 0 || !fabricArr.includes(labelStr))
      fabricArr.push(labelStr);
    else {
      for (let i = 0; i < fabricArr.length; i++) {
        if (fabricArr[i] === labelStr) fabricArr.splice(i, 1);
      }
    }
    this.setState({ fabric_types: fabricArr });
  };

  handlePlace = (place) => {
    this.props.sendCoordinates(place.geometry.coordinates);
  };

  render() {
    return (
      <div className="left-block-top">
        <LocationAutoComplete onSelect={this.handlePlace} />
        <div className="checkbox-container">
          <span>Filter by materials:</span>
          {fabric_types.map((elm) => (
            <Checkbox
              key={elm}
              label={elm}
              value={elm}
              onChange={this.handleCheckChanges}
            />
          ))}
        </div>
        <div className="projects-found">
          <h3 className="bold has-text-grey">
            {this.props.projectsNumber} project(s) found:
          </h3>
          {this.props.isStoreSelected && (
            <div>
              <button
                className="button is-primary is-small is-light"
                onClick={this.props.handleResetClick}
              >
                show all
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default Searchbar;
