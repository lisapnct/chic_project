require("dotenv").config();
const Store = require("../models/Store");
const mongoose = require("mongoose");

const stores = [
  {
    name: "PlopBar",
    id_projects: ["5f8728c34e1830602e66e6db", "5f872d4aecf7d36087f19dd5"],
    location: {
      type: "Point",
      coordinates: [2.3870754, 48.8406713],
      formattedAddress: "3 Passage du Charolais 75012 Paris",
    },
  },
  {
    name: "HermesT",
    id_projects: ["5f8816b7b74c8080552c28b3", "5f8816b7b74c8080552c28b3"],
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
    Store.create(projects)
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
