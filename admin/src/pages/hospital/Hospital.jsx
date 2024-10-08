import React, { useState, useEffect } from 'react';
import AssignHospitalModal from './AssignHospitalModal';
import axios from 'axios';

function Hospital({ doctors }) {
  const [hospitals, setHospitals] = useState([]); 
  const [isAssignModalOpen, setAssignModalOpen] = useState(false);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/hospital/getAll'); 
        const hospitalsWithDoctorNames = await Promise.all(
          response.data.map(async (hospital) => {
            if (hospital.assignedDoctor) {
              const doctorResponse = await axios.get(`http://localhost:5001/api/doctor/${hospital.assignedDoctor}`);
              hospital.assignedDoctorName = doctorResponse.data.fullName; // Use the correct field name for doctor name
            }
            return hospital;
          })
        );
        setHospitals(hospitalsWithDoctorNames); // Set hospitals with doctor names
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      }
    };

    fetchHospitals();
  }, []);

  const handleAssignHospital = async (newHospital) => {
    try {
      const response = await axios.post('http://localhost:5001/api/hospital/assign', newHospital);
      const hospital = response.data;

      if (hospital.assignedDoctor) {
        const doctorResponse = await axios.get(`http://localhost:5001/api/doctor/${hospital.assignedDoctor}`);
        hospital.assignedDoctorName = doctorResponse.data.fullName; // Fetch the correct doctor name
      }

      setHospitals((prevHospitals) => [...prevHospitals, hospital]); // Add new hospital with doctor name to the list
      setAssignModalOpen(false);
    } catch (error) {
      console.error('Error assigning hospital:', error);
    }
  };

  // Function to handle delete
  const handleDeleteHospital = async (hospitalId) => {
    try {
      await axios.delete(`http://localhost:5001/api/hospital/delete/${hospitalId}`); // API call to delete hospital
      setHospitals((prevHospitals) => prevHospitals.filter((hospital) => hospital._id !== hospitalId)); // Update state after deletion
    } catch (error) {
      console.error('Error deleting hospital:', error);
    }
  };

  return (
    <div className="p-6 relative">
      <h2 className="text-2xl font-bold mb-4">Hospital Information</h2>
      <button
        className="bg-blue-500 text-white px-2 py-1 rounded mr-2 mb-2"
        onClick={() => setAssignModalOpen(true)}
      >
        Assign Hospital
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-black">
              <th className="border border-gray-300 px-4 py-2">Hospital Name</th>
              <th className="border border-gray-300 px-4 py-2">Hospital Number</th>
              <th className="border border-gray-300 px-4 py-2">Address</th>
              <th className="border border-gray-300 px-4 py-2">City</th>
              <th className="border border-gray-300 px-4 py-2">Assigned Doctor</th>
              <th className="border border-gray-300 px-4 py-2">Action</th> {/* New Action column */}
            </tr>
          </thead>
          <tbody>
            {hospitals.length > 0 ? (
              hospitals.map((hospital) => (
                <tr key={hospital._id}>
                  <td className="border border-gray-300 px-4 py-2">{hospital.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{hospital.number}</td>
                  <td className="border border-gray-300 px-4 py-2">{hospital.address}</td>
                  <td className="border border-gray-300 px-4 py-2">{hospital.city}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {hospital.assignedDoctorName || "No doctor assigned"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDeleteHospital(hospital._id)} // Delete action
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No hospitals available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isAssignModalOpen && (
        <AssignHospitalModal
          isOpen={isAssignModalOpen}
          onClose={() => setAssignModalOpen(false)}
          onAssign={handleAssignHospital}
          doctors={doctors}
        />
      )}
    </div>
  );
}

export default Hospital;
