const Doctor = require('../models/User'); // Assuming you have a Doctor model

// Assign a new doctor
exports.assignDoctor = async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body); // Assuming you're sending the doctor data in req.body
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
