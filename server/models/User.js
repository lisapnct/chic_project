const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  paillettes: {
    type: Number,
    default: 0,
  },
  profilePicture: {
    type: String,
    default:
      "https://projetchic.s3.eu-west-3.amazonaws.com/default_profile_picture.svg",
  },
  role: {
    type: String,
    enum: ["user", "designer", "admin"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
