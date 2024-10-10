const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hospitalSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  number: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  assignedDoctor: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
  }
})
const Hospital = mongoose.model('Hospital', hospitalSchema);
module.exports = Hospital;
