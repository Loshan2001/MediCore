const Doctor = require('../models/User'); // Assuming you have a Doctor model
const bcrypt = require('bcryptjs'); 
const Appointment = require('../models/Appointment'); // Assuming the Appointment model is in the models directory

exports.assignDoctor = async (req, res) => {
  try {
    // Hash the password before saving
    const salt = await bcrypt.genSalt(10); // Generate a salt
    const hashedPassword = await bcrypt.hash(req.body.password, salt); // Hash the password with the salt

    // Create new doctor with hashed password
    const newDoctor = new Doctor({
      ...req.body,
      password: hashedPassword, // Use the hashed password
    });

    await newDoctor.save();
    res.status(201).json({ message: 'Doctor assigned successfully', doctor: newDoctor });
  } catch (error) {
    res.status(500).json({ error: 'Error assigning doctor' });
  }
};

// Update an existing doctor
exports.updateDoctor = async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    res.status(200).json({ message: 'Doctor updated successfully', doctor: updatedDoctor });
  } catch (error) {
    res.status(500).json({ error: 'Error updating doctor' });
  }
};

// Delete a doctor
exports.deleteDoctor = async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting doctor' });
  }
};

// Get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching doctors' });
  }
};
// Get doctor by ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctorId = req.params.id; 
    console.log(doctorId)
    const doctor = await Doctor.findOne({ _id: doctorId, userType: 'doctor' });

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found or user is not a doctor' });
    }

    res.status(200).json(doctor); 
  } catch (error) {
    res.status(500).json({ error: 'Error fetching doctor by ID' }); // Handle errors
  }
};
// Find doctor by partial doctorName match
exports.searchDoctor = async (req, res) => {
  try {
    const { doctorName } = req.query; // Get the doctorName from the query parameters

    let query = {};

    // If doctorName is provided, use regex for partial matching (case insensitive)
    if (doctorName) {
      query.doctorName = { $regex: doctorName, $options: 'i' }; // 'i' for case-insensitive match
    }

    // Find appointments matching the query
    const appointments = await Appointment.find(query).populate('user'); // Populate to fetch user details

    if (!appointments.length) {
      return res.status(404).json({ error: 'No doctor found matching the provided name' });
    }

    // Return matching appointments
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Error finding doctor by name' });
  }
};
