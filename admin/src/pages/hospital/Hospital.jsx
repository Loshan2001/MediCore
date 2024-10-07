import React, { useState } from 'react';
import AssignHospitalModal from './AssignHospitalModal';

function Hospital({ doctors }) {
  const [hospitals, setHospitals] = useState([
    { id: 1, name: 'City Hospital', number: '123-456-7890', address: '123 Main St', city: 'New York', assignedDoctor: 'Dr. John Doe' },
    { id: 2, name: 'General Hospital', number: '987-654-3210', address: '456 Market St', city: 'Los Angeles', assignedDoctor: 'Dr. Jane Smith' },
  ]);

  const [isAssignModalOpen, setAssignModalOpen] = useState(false);

  const handleAssignHospital = (newHospital) => {
    const assignedDoctorName = doctors.find(doc => doc.id === parseInt(newHospital.assignedDoctor))?.name;
    setHospitals([...hospitals, { ...newHospital, id: hospitals.length + 1, assignedDoctor: assignedDoctorName }]);
  };

  return (
    <div className="p-6 overflow-auto relative z-10">
      <h2 className="text-2xl font-bold mb-4">Hospital Information</h2>
      <button
        className="bg-blue-500 text-white px-2 py-1 rounded mr-2 mb-2"
        onClick={() => setAssignModalOpen(true)}
      >
        Assign Hospital
      </button>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-black">
            <th className="border border-gray-300 px-4 py-2">Hospital Name</th>
            <th className="border border-gray-300 px-4 py-2">Hospital Number</th>
            <th className="border border-gray-300 px-4 py-2">Address</th>
            <th className="border border-gray-300 px-4 py-2">City</th>
            <th className="border border-gray-300 px-4 py-2">Assigned Doctor</th>
          </tr>
        </thead>
        <tbody>
          {hospitals.map((hospital) => (
            <tr key={hospital.id}>
              <td className="border border-gray-300 px-4 py-2">{hospital.name}</td>
              <td className="border border-gray-300 px-4 py-2">{hospital.number}</td>
              <td className="border border-gray-300 px-4 py-2">{hospital.address}</td>
              <td className="border border-gray-300 px-4 py-2">{hospital.city}</td>
              <td className="border border-gray-300 px-4 py-2">{hospital.assignedDoctor}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Assign Hospital Modal */}
      <AssignHospitalModal 
  isOpen={true} 
  onClose={() => {}} 
  onAssign={() => {}} 
  doctors={[{ id: 1, name: 'Dr. John Doe' }]} 
/>
{/* <AssignHospitalModal
  isOpen={isAssignModalOpen}
  onClose={() => setAssignModalOpen(false)}  // This will close the modal
  onAssign={handleAssignHospital}
  doctors={doctors}
/> */}
    </div>
  );
}

export default Hospital;
