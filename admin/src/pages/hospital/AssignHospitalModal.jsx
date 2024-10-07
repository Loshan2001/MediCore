import { useState } from 'react';
const AssignHospitalModal = ({ isOpen, onClose, onAssign, doctors }) => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    address: '',
    city: '',
    assignedDoctor: '', 
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAssign = () => {
    onAssign(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Assign Hospital</h2>
        <div className="mb-4">
          <label className="block mb-1 text-gray-800">Hospital Name:</label>
          <input
            className="w-full border px-3 py-2 rounded text-gray-900"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
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
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-800">Assign Doctor:</label>
          <select
            className="w-full border px-3 py-2 rounded text-gray-900"
            name="assignedDoctor"
            value={formData.assignedDoctor}
            onChange={handleChange}
          >
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleAssign}
          >
            Assign
          </button>
          <button
            className="bg-gray-600 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignHospitalModal;
