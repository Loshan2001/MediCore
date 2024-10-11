const Hospital = require('../models/Hospital'); // Assuming you have a Hospital model
const Appointment = require('../models/Appointment');


exports.assignHospital = async (req, res) => {
  try {
    const { name, number, address, city, assignedDoctor } = req.body;

    const newHospital = new Hospital({
      name,
      number,
      address,
      city,
      assignedDoctor
     
    });

    const savedHospital = await newHospital.save();
    res.status(201).json(savedHospital); 
  } catch (error) {
    res.status(500).json({ message: 'Error assigning hospital', error });
  }
};


exports.deleteHospital = async (req, res) => {
  try {
    const { id } = req.params;
    await Hospital.findByIdAndDelete(id);
    res.status(200).json({ message: 'Hospital deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting hospital', error });
  }
};


exports.updateHospital = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedHospital = await Hospital.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json(updatedHospital);
  } catch (error) {
    res.status(500).json({ message: 'Error updating hospital', error });
  }
};


exports.getAllHospital = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.status(200).json(hospitals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hospitals', error });
    console.log(error);
  }
};

exports.getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find().populate('assignedDoctor'); // Populate the assignedDoctor field with the fullName
    res.status(200).json(hospitals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hospitals', error });
    console.log(error);
  }
};

exports.searchHospital = async (req, res) => {
  try {
    const { hospitalName } = req.query; // Get the hospitalName from the query parameters

    let query = {};

    // If hospitalName is provided, use regex for partial matching (case insensitive)
    if (hospitalName) {
      query.hospitalName = { $regex: hospitalName, $options: 'i' }; // 'i' for case-insensitive match
    }

    // Find appointments matching the query and populate the associated user (doctor) details
    const appointments = await Appointment.find(query).populate('user').populate('hospital'); 

    if (!appointments.length) {
      return res.status(404).json({ error: 'No appointments found for the provided hospital name' });
    }

    // Return matching appointments
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Error finding appointments by hospital name' });
  }
};

