import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import ReactMapboxGl from "react-mapbox-gl";
import { Marker, Popup } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

class HomeMap extends Component {
  state = {
    stores: null,
    location: [2.3514, 48.85658],
    markerSelected: null,
  };

  componentDidMount = () => {
    apiHandler
      .getAll("/api/stores")
      .then((apiRes) => this.setState({ stores: apiRes.data }))
      .catch((apiErr) => console.log(apiErr));
  };

  handleClickMarker = (store) => {
    this.setState({
      markerSelected: store,
    });
    this.props.handleMarkClic(store._id);
  };

  handleClosePopup = () => {
    this.setState({
      markerSelected: null,
    });
    this.props.displayAllProjects();
  };

  render() {
    const stores = this.state.stores;
    const mapstyle = {
      style: "mapbox://styles/lisapnct/ckgkly9xo0y3g19nx3mf2yhep",
    };
    return (
      <div>
        {this.props.searchInput && (
          <React.Fragment>
            <Map
              style={mapstyle.style}
              center={this.props.searchInput}
              zoom={[12]}
              containerStyle={{
                height: "100vh",
                width: "100vw",
                borderRadius: "20px",
              }}
            >
              {stores
                ? stores.map((store) => (
                    <Marker
                      key={store._id}
                      coordinates={store.location.coordinates}
                      anchor="bottom"
                    >
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          this.handleClickMarker(store);
                        }}
                      >
                        <i className="fas fa-2x has-text-primary fa-store-alt"></i>
                      </div>
                    </Marker>
                  ))
                : null}

              {this.state.markerSelected ? (
                <Popup
                  coordinates={this.state.markerSelected.location.coordinates}
                  offset={{
                    "bottom-left": [12, -38],
                    bottom: [0, -38],
                    "bottom-right": [-12, -38],
                  }}
                  className="popup"
                >
                  <div className="popup-container">
                    <div>
                      <h2 className="main-title has-text-primary">
                        {this.state.markerSelected.name}
                      </h2>
                      <p>
                        <i className="fas fa-map-marker-alt"></i> 
                        {this.state.markerSelected.location.formattedAddress}
                      </p>
                    </div>
                    <div className="popup-close">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          this.handleClosePopup();
                        }}
                        className="delete"
                      ></button>
                    </div>
                  </div>
                </Popup>
              ) : null}
            </Map>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default HomeMap;
