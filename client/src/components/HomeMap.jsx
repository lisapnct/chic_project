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
      borderColor: "inherit",
      cursor: "pointer",
    };
    const mapstyle = { style: "mapbox://styles/mapbox/light-v10" }
    return (
      <div>
        <Map
          style={mapstyle.style}
          center={[2.3837684, 48.8593118]}
          zoom={[12]}
          containerStyle={{
            height: "94.5vh",
            width: "100vw",
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
      </div>
    );
  }
}

export default HomeMap;
