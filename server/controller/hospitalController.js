const Hospital = require('../models/Hospital'); // Assuming you have a Hospital model


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
  }
};
