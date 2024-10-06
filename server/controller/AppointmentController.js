const Appointment = require('../models/Appointment');


exports.createAppointment = async (req, res) => {
  try {
    const { doctorName, hospitalName, specialization, date, user } = req.body;

    const newAppointment = new Appointment({
      doctorName,
      hospitalName,
      specialization,
      date,
      user,
    });

    const savedAppointment = await newAppointment.save();
    return res.status(201).json(savedAppointment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('user');
    return res.status(200).json(appointments);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
