import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Doctor() {
  const [doctors, setDoctors] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/doctor/getAll"
      );
      const doctorData = response.data.filter(
        (user) => user.userType === "doctor"
      );
      setDoctors(doctorData);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch doctors. Please try again.",
      });
    }
  };

  const handleEditClick = (doctor) => {
    setCurrentDoctor(doctor);
    setIsEditModalOpen(true);
  };

  
  const handleSaveDoctor = async (formData) => {
    try {
      console.log('Current Doctor Before Update:', currentDoctor); // Debugging line
  
      await axios.put(
        `http://localhost:5001/api/doctor/update/${currentDoctor._id}`,
        formData // Ensure currentDoctor reflects the latest form data
      );
  
      // Update state with new data
      setDoctors(
        doctors.map((doc) =>
          doc._id === currentDoctor._id ? currentDoctor : doc
        )
      );
  
      setIsEditModalOpen(false);
      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Doctor information updated successfully!",
      });
    } catch (error) {
      console.error("Error updating doctor:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "There was an error updating the doctor. Please try again.",
      });
    }
  };
  

  const handleDeleteClick = async (doctorId) => {
    try {
      await axios.delete(`http://localhost:5001/api/doctor/delete/${doctorId}`);
      setDoctors(doctors.filter((doctor) => doctor._id !== doctorId));
      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Doctor has been deleted successfully!",
      });
    } catch (error) {
      console.error("Error deleting doctor:", error);
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: "There was an error deleting the doctor. Please try again.",
      });
    }
  };

  const handleAssignDoctor = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/doctor/assign",
        formData
      );
      setDoctors([...doctors, response.data]);
      setIsAssignModalOpen(false);
      Swal.fire({
        icon: "success",
        title: "Doctor Assigned",
        text: "The doctor has been successfully assigned!",
      });
    } catch (error) {
      console.error("Error assigning doctor:", error);
      Swal.fire({
        icon: "error",
        title: "Assignment Failed",
        text: "There was an error assigning the doctor. Please try again.",
      });
    }
  };

  return (
    <div className="p-6 overflow-auto relative z-10">
      <h2 className="text-2xl font-bold mb-4">Doctor Information</h2>
      <button
        onClick={() => setIsAssignModalOpen(true)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Assign New Doctor
      </button>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-black">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Specialization</th>
            <th className="border border-gray-300 px-4 py-2">Phone</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor._id}>
              <td className="border border-gray-300 px-4 py-2">
                {doctor.fullName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {doctor.specialization || "N/A"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {doctor.phoneNo || doctor.phone}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {doctor.email}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleEditClick(doctor)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteClick(doctor._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditModalOpen && (
        <EditDoctorModal
          doctor={currentDoctor}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveDoctor}
        />
      )}

      {isAssignModalOpen && (
        <AssignDoctorModal
          isOpen={isAssignModalOpen}
          onClose={() => setIsAssignModalOpen(false)}
          onAssign={handleAssignDoctor}
        />
      )}
    </div>
  );
}

const EditDoctorModal = ({ doctor, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    fullName: doctor.fullName || "",
    specialization: doctor.specialization || "",
    phoneNo: doctor.phoneNo || doctor.phone || "",
    email: doctor.email || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Update Doctor
        </h2>
        <div className="mb-4">
          <label className="block mb-1 text-gray-800">Full Name:</label>
          <input
            className="w-full border px-3 py-2 rounded text-gray-900"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-800">Specialization:</label>
          <select
            className="w-full border px-3 py-2 rounded text-gray-900"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
          >
            <option value="">Select Specialization</option>
            <option value="dermatologist">Dermatologist</option>
            <option value="cardiologist">Cardiologist</option>
            <option value="neurologist">Neurologist</option>
            <option value="pediatrician">Pediatrician</option>
            <option value="orthopedic">Orthopedic</option>
            <option value="general_practitioner">General Practitioner</option>
            <option value="psychiatrist">Psychiatrist</option>
            <option value="gynecologist">Gynecologist</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-800">Phone:</label>
          <input
            className="w-full border px-3 py-2 rounded text-gray-900"
            type="text"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-800">Email:</label>
          <input
            className="w-full border px-3 py-2 rounded text-gray-900"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleSave}
          >
            Update
          </button>
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const AssignDoctorModal = ({ isOpen, onClose, onAssign }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    specialization: "",
    phoneNo: "",
    email: "",
    password: "",
    userType: "doctor",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAssign = () => {
    onAssign(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Assign Doctor
        </h2>
        <div className="mb-4">
          <label className="block mb-1 text-gray-800">Full Name:</label>
          <input
            className="w-full border px-3 py-2 rounded text-gray-900"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-800">Specialization:</label>
          <select
            className="w-full border px-3 py-2 rounded text-gray-900"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
          >
            <option value="">Select Specialization</option>
            <option value="dermatologist">Dermatologist</option>
            <option value="cardiologist">Cardiologist</option>
            <option value="neurologist">Neurologist</option>
            <option value="pediatrician">Pediatrician</option>
            <option value="orthopedic">Orthopedic</option>
            <option value="general_practitioner">General Practitioner</option>
            <option value="psychiatrist">Psychiatrist</option>
            <option value="gynecologist">Gynecologist</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-800">Phone:</label>
          <input
            className="w-full border px-3 py-2 rounded text-gray-900"
            type="text"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-800">Email:</label>
          <input
            className="w-full border px-3 py-2 rounded text-gray-900"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-800">Password:</label>
          <input
            className="w-full border px-3 py-2 rounded text-gray-900"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleAssign}
          >
            Assign
          </button>
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Doctor;
