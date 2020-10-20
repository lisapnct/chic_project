const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  description: String,
  deadline: Date,
  isSuccess: {
    type: Boolean,
    default: false,
  },
  store: {
    type: Schema.Types.ObjectId,
    ref: "Store",
  },
  materials: [
    {
      fabric_type: {
        type: String,
        enum: ["cotton", "linen", "silk", "wool", "artificial fibers"],
      },
      required_quantity: Number,
      collected_quantity: {
        type: Number,
        default: 0,
      },
      fullyCollected: {
        type: Boolean,
        default: false,
      },
    },
  ],
  contributors: [
    {
      id_user: 
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      contributed_materials: [
        {
          fabric_type: String,
          quantity: Number,
        },
      ],
    },
  ],
  image: {
    type: String,
    default: "",
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
