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
    console.log(this.state.stores);
    return <div>
        <Map
          style="mapbox://styles/mapbox/light-v10"
          center={[2.350149, 48.852872]}
          zoom={[12]}
          containerStyle={{
            height: "100vh",
            width: "100vw",
          }}
          >
        { stores 
          ? stores.map(elm => 
            <Marker
                    key={elm._id}
                    coordinates={elm.location.coordinates}
                    anchor="bottom"
                  >
                    <img
                      alt={elm.name}
                      style={{ width: 4 + "vw", borderRadius: "50%", borderColor: "inherit" }}
                      src={elm.image}
                    />
          </Marker> ) 
          : null 
        }
        </Map>
    </div>;
  }
}

export default HomeMap;
