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
    location: [2.35140, 48.85658],
    showPopup: true
  };

  componentDidMount = () => {
    apiHandler
      .getAll("/api/stores")
      .then((apiRes) => this.setState({ stores: apiRes.data }))
      .catch((apiErr) => console.log(apiErr));
  };

  handleClickMarker = (elm) => {
    this.props.handleMarkClic(elm._id);
    return (
      <Popup
        latitude={elm.location.coordinates[1]}
        longitude={elm.location.coordinates[0]}
        anchor="top" >
        <p>{elm.name}</p>
      </Popup>)
  }

  render() {
    const stores = this.state.stores;
    const mapElmStyle = {
      width: 1.5 + "vw",
      cursor: "pointer",
    };
    const mapstyle = { style: "mapbox://styles/mapbox/streets-v11" };
    const {showPopup} = this.state;
    return (
      <div>
        {this.props.searchInput && (
          <React.Fragment>
            <Map
              style={mapstyle.style}
              center={this.props.searchInput}
              zoom={[12]}
              containerStyle={{
                height: "96vh",
                width: "100vw",
                borderRadius: "20px",
                // focus: "outline:0"
              }}
            >
              {stores
                ? stores.map((elm) => (
                    <Marker
                      key={elm._id}
                      coordinates={elm.location.coordinates}
                      anchor="bottom"
                      onClick={() => this.handleClickMarker(elm)}
                    >
                      <img alt={elm.name} style={mapElmStyle} src="https://static.thenounproject.com/png/1516539-200.png"/>
                    </Marker>
                  ))
                : null}
            </Map>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default HomeMap;
