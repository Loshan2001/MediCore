import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [hospitals, setHospital] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);

  useEffect(() => {
    fetchAppointment();
  }, []);

  const fetchAppointment = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/appointment/"
      );
      const res = await axios.get("http://localhost:5001/api/hospital/");
      setAppointments(response.data);
      setHospital(res.data);
    } catch (error) {
      console.error("Error fetching Appointments:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch appointments. Please try again.",
      });
    }
  };

  


  const handleDeleteClick = async (appointmentId) => {
    try {
      await axios.delete(
        `http://localhost:5001/api/appointment/delete/${appointmentId}`
      );
      setAppointments(
        appointments.filter((appointment) => appointment._id !== appointmentId)
      );
      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Appointment has been deleted successfully!",
      });
    } catch (error) {
      console.error("Error deleting doctor:", error);
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: "There was an error deleting the Appointment. Please try again.",
      });
    }
  };

  const handleAssignAppointment = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/appointment/create",
        formData
      );
      setAppointments([...appointments, response.data]);
      setIsAssignModalOpen(false);
      Swal.fire({
        icon: "success",
        title: "Appointment created",
        text: "Appointment has been booked successfully!",
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
      <h2 className="text-2xl font-bold mb-4">Appointment Information</h2>
      <button
        onClick={() => setIsAssignModalOpen(true)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Create Appointment
      </button>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-black">
            <th className="border border-gray-300 px-4 py-2">Doctor Name</th>
            <th className="border border-gray-300 px-4 py-2">Hospital Name</th>
            <th className="border border-gray-300 px-4 py-2">Specialization</th>
            <th className="border border-gray-300 px-4 py-2">Phone</th>
            <th className="border border-gray-300 px-4 py-2">Time Slot</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            {/* <th className="border border-gray-300 px-4 py-2">Email</th> */}
            <th className="border border-gray-300 px-4 py-2">Max Patients</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              <td className="border border-gray-300 px-4 py-2">
                {appointment.doctorName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {appointment.hospitalName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {appointment.user.specialization || "N/A"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {appointment.user.phoneNo || appointment.user.phone}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {appointment.appointmentTimeSlot}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(appointment.appointmentDate).toLocaleDateString(
                  "en-CA"
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {appointment.maxPatients}
              </td>

              {/* <td className="border border-gray-300 px-4 py-2">{appointment.user.email}</td> */}
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleDeleteClick(appointment._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isAssignModalOpen && (
        <AssignAppointmentModal
          isOpen={isAssignModalOpen}
          onClose={() => setIsAssignModalOpen(false)}
          onAssign={handleAssignAppointment}
        />
      )}
    </div>
  );
}


const AssignAppointmentModal = ({ isOpen, onClose, onAssign }) => {
  const [hospitals, setHospital] = useState([]);

  useEffect(() => {
    fetchAppointment();
  }, []);

  const fetchAppointment = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/hospital/");
      setHospital(res.data);
    } catch (error) {
      console.error("Error fetching Appointments:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch appointments. Please try again.",
      });
    }
  };
  const [formData, setFormData] = useState({
    doctorName: "",
    hospitalName: "",
    appointmentTimeSlot: "",
    appointmentDate: "",
    maxPatients: "",
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
          Create Appointment
        </h2>
        <div className="mb-4">
          <label className="block mb-1 text-gray-800">Select Hospital:</label>
          <select
            className="w-full border px-3 py-2 rounded text-gray-900"
            name="hospitalName"
            value={formData.hospitalName}
            onChange={handleChange}
            required
          >
            <option value="">Select Hospital</option>
            {hospitals.map((hospital) => (
              <option key={hospital.hospitalName} value={hospital.hospitalName}>
                {hospital.name} {/* Display full name or concatenated names */}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-800">Doctor Name:</label>
          <select
            className="w-full border px-3 py-2 rounded text-gray-900"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
            required
          >
            <option value="">Select Hospital</option>
            {hospitals.map((hospital) => (
              <option key={hospital.assignedDoctor.doctorName} value={hospital.assignedDoctor.doctorName}>
                {hospital.assignedDoctor.fullName}{" "}
                {/* Display full name or concatenated names */}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-800">Time Slot:</label>
          <input
            className="w-full border px-3 py-2 rounded text-gray-900"
            type="text"
            name="appointmentTimeSlot"
            value={formData.appointmentTimeSlot}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-800">Date:</label>
          <input
            className="w-full border px-3 py-2 rounded text-gray-900"
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-800">Max Patients:</label>
          <input
            className="w-full border px-3 py-2 rounded text-gray-900"
            type="number"
            name="maxPatients"
            value={formData.maxPatients}
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

export default Appointment;
