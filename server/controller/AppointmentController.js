const Appointment = require("../models/Appointment");
const User = require("../models/User");


exports.createAppointment = async (req, res) => {
  try {

    const { doctorName, hospitalName, appointmentTimeSlot, appointmentDate, maxPatients } =req.body;
    let user = {};

    try {
      console.log(req.body.doctorName);
      user = await User.findOne({ fullName: doctorName ,userType: 'doctor'}); // Find the user by the doctorName field
      
      console.log(user._id);
      if (!user) {
        return res.status(404).json({ message: "Doctor not found" });
      }

    
    } catch (error) {
      console.error("Error finding the doctor:", error);
      return res
        .status(500)
        .json({ message: "Server error. Please try again later." });
    }

    
    const newAppointment = new Appointment({
      doctorName,
      hospitalName,
      appointmentTimeSlot,
      appointmentDate,
      maxPatients,
      user: user._id, // Use the correct user ID here
    });

    const savedAppointment = await newAppointment.save();
    return res.status(201).json(savedAppointment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("user");
    return res.status(200).json(appointments);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    await Appointment.findByIdAndDelete(id);
    return res.status(200).json({ message: "Appointment deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
