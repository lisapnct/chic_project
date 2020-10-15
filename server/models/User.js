const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: String, 
  paillettes: Number,
  profilePicture: {
    type: String,
    default:
      'https://projetchic.s3.eu-west-3.amazonaws.com/undraw_social_girl_562b.png',
  },
  role: {
    type: String, 
    enum: ['user', 'designer', 'admin'],
  },
  id_projects: {
    type: [Schema.Types.ObjectId],
    ref: "Project",
  },
  fav_id_projects: {
    type: [Schema.Types.ObjectId],
    ref: "Project",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
