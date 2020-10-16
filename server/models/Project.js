const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: String,
  description: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  materials: [
    {
      fabric_type: {
        type: String,
        enum: ['linen', 'cotton', 'wool', 'silk', 'aritficial fibers'],
      },
      required_quantity: Number,
      collected_quantity: {
        type: Number, 
        default: 0, 
      },
      color: String,
      fullyCollected: {
        type: Boolean,
        default: false,
      },
    },
  ],
  isSuccess: {
    type: Boolean,
    default: false,
  },
  contributors: [
    {
      id_users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
      }],
      contributed_materials: [
        {
          fabric_type: String,
          quantity: Number,
        },
      ],
    },
  ],
  images: {
    type: String,
    default: '',
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
