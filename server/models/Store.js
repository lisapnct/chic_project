const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new Schema({
  name: String,
  id_projects: {
        type: [Schema.Types.ObjectId],
        ref: 'Project',
  }, 
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
    },
    formattedAddress: String,
  },
  image: {
      type: String,
      default: 'https://projetchic.s3.eu-west-3.amazonaws.com/undraw_Appreciation_sjc1.png',
  },
});

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;