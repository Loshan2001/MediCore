const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  doctorName: { type: String, required: true },
  hospitalName: { type: String, required: true },
  appointmentTimeSlot: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  maxPatients: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'} 
});
module.exports = mongoose.model("Appointment", AppointmentSchema);
