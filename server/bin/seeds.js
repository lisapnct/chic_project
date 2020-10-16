require("dotenv").config();
const Project = require("../models/Project");
const mongoose = require("mongoose");

const projects = [
  {
    name: "Proxy Project",
    description: "This is a fun project",
    creator: "5f88649b53efc71c37231bbf",
    materials: [
      {
        fabric_type: "lin",
        required_quantity: 10,
        collected_quantity: 1,
        color: "blue",
        fullyCollected: false,
      },
    ],
    isSuccess: false,
    contributors: [
      {
        id_users: "5f88a8f6c425aa34822c59b9",
        contributed_materials: [
          {
            fabric_type: "lin",
            quantity: 1,
          },
        ],
      },
    ],
  },
  {
    name: "Another Project",
    description: "This is a cool project",
    creator: "5f87f72e1a940fe86c5601c9",
    materials: [
      {
        fabric_type: "coton",
        required_quantity: 15,
        collected_quantity: 4,
        color: "white",
        fullyCollected: false,
      },
    ],
    isSuccess: false,
    contributors: [
      {
        id_users: "5f88649b53efc71c37231bbf",
        contributed_materials: [
          {
            fabric_type: "coton",
            quantity: 4,
          },
        ],
      },
    ],
  },
];

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    Project.create(projects)
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
