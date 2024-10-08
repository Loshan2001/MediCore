import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignHospitalModal = ({ isOpen, onClose, onAssign }) => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    address: '',
    city: '',
    assignedDoctor: '',
  });
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      fetchDoctors();
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const fetchDoctors = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5001/api/doctor/getAll');
      const doctorData = response.data.filter(user => user.userType === 'doctor');
      setDoctors(doctorData); // Set doctor data after filtering for doctors
    } catch (err) {
      console.error('Error fetching doctors:', err);
      setError('Failed to load doctors. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:5001/api/hospital/assign', formData);
        onAssign(response.data);
        onClose();
      } catch (error) {
        console.error('Error assigning hospital:', error);
        alert('Failed to assign hospital. Please try again.');
      }
    } else {
      alert("Please fill out all fields.");
    }
  };

  const validateForm = () => {
    return formData.name && formData.number && formData.address && formData.city && formData.assignedDoctor;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex">
      <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Assign Hospital</h2>
        {loading && <p>Loading doctors...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleAssign}>
          <div className="mb-4">
            <label className="block mb-1 text-gray-800">Hospital Name:</label>
            <input
              className="w-full border px-3 py-2 rounded text-gray-900"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-800">Hospital Number:</label>
            <input
              className="w-full border px-3 py-2 rounded text-gray-900"
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-800">Address:</label>
            <input
              className="w-full border px-3 py-2 rounded text-gray-900"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-800">City:</label>
            <input
              className="w-full border px-3 py-2 rounded text-gray-900"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-800">Assign Doctor:</label>
            <select
              className="w-full border px-3 py-2 rounded text-gray-900"
              name="assignedDoctor"
              value={formData.assignedDoctor}
              onChange={handleChange}
              required
            >
              <option value="">Select Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.fullName || `${doctor.firstName} ${doctor.lastName}`} {/* Display full name or concatenated names */}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Assign
            </button>
            <button
              type="button"
              className="bg-gray-600 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignHospitalModal;
