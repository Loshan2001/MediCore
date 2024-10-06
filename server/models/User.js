// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ['doctor', 'patient'],  
    default: 'patient', 
  },
  phoneNo: {
    type: String,
    default: '', 
  },
  address: {
    type: String,
    default: '', 
  },


});

module.exports = mongoose.model("User", userSchema);
