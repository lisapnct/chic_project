require("dotenv").config();
const Store = require("../models/Store");
const mongoose = require("mongoose");

const stores = [
  {
    name: "PlopBar",
    id_projects: ["5f89afae638cdf622889e58e", "5f89b1271963fb6c2c904785"],
    location: {
      type: "Point",
      coordinates: [2.3870754, 48.8406713],
      formattedAddress: "3 Passage du Charolais 75012 Paris",
    },
  },
  {
    name: "HermesT",
    id_projects: ["5f89afae638cdf622889e58e"],
    location: {
      type: "Point",
      coordinates: [2.3194649, 48.868937],
      formattedAddress: "24 Rue du Faubourg Saint-Honoré, 75008 Paris",
    },
  },
];

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    Store.create(stores)
      .then((dbResult) => {
        console.log(dbResult);
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    console.log(error);
  });
