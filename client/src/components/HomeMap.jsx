import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import ReactMapboxGl from "react-mapbox-gl";
import { Marker } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

class HomeMap extends Component {
  state = {
    stores: null,
    location: [2.35183, 48.85658],
  };

  componentDidMount = () => {
    apiHandler
      .getAll("/api/stores")
      .then((apiRes) => this.setState({ stores: apiRes.data }))
      .catch((apiErr) => console.log(apiErr));
  };

  render() {
    const stores = this.state.stores;
    const mapElmStyle = {
      width: 4 + "vw",
      borderRadius: "50%",
      borderColor: "white",
      cursor: "pointer",
    };
    const mapstyle = { style: "mapbox://styles/mapbox/light-v10" };

    return (
      <div>
        {this.props.searchInput && (
          <React.Fragment>
            <Map
              style={mapstyle.style}
              center={this.props.searchInput}
              zoom={[14]}
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
                      onClick={() => this.props.handleMarkClic(elm._id)}
                    >
                      <img alt={elm.name} style={mapElmStyle} src={elm.image} />
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
