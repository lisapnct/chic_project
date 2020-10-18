import React, { Component } from "react";
import axios from "axios";

class LocationAutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      results: [],
      isLoading: false,
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);

    if (!process.env.REACT_APP_MAPBOX_TOKEN) {
      throw new Error(
        "You don't have any 'process.env.REACT_APP_MAPBOX_API_KEY'"
      );
    }
  }

  handleSearchChange(e) {
    this.setState({
      search: e.target.value,
      isLoading: true,
    });

    // Stop the previous setTimeout if there is one in progress
    clearTimeout(this.timeoutId);

    // Launch a new request in 1000ms (1s) => Avoids excessive requests to the end point.
    this.timeoutId = setTimeout(() => {
      this.performSearch();
    }, 1000);
  }

  performSearch() {
    if (this.state.search === "") {
      this.setState({
        results: [],
        isLoading: false,
      });
      return;
    }

    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.state.search}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
      )
      .then((response) => {
        this.setState({
          results: response.data.features,
          isLoading: false,
        });
      });
  }

  handleItemClicked(place) {
    this.setState({
      search: place.place_name,
      results: [],
    });

    this.props.onSelect(place);
  }

  render() {
    return (
      <div className="LocationAutoComplete">
        <div className="control has-icons-left has-icons-right">
          <input
            className="input is-rounded searchbar"
            type="text"
            value={this.state.search}
            onChange={this.handleSearchChange}
            placeholder="Enter an address to find a store"
          />
          <div className="icon is-small is-left">
            <i className="fas fa-search"></i>
          </div>
        </div>

        <ul className="location-autocomplete-results is-rounded">
          {this.state.results.map((place) => (
            <li
              key={place.id}
              className="location-autocomplete-items has-text-grey"
              onClick={() => this.handleItemClicked(place)}
            >
              <p>{place.place_name}</p>
            </li>
          ))}
          {this.state.isLoading && (
            <li className="location-autocomplete-items has-text-grey">
              Loading...
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default LocationAutoComplete;
