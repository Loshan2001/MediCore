const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  doctorName: { type: String, required: true },
  hospitalName: { type: String, required: true },
  specialization: { type: String, required: true },
  date: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'} 
});
module.exports = mongoose.model("Appointment", AppointmentSchema);
