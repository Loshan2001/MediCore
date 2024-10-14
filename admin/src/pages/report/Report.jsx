import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Report() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/booking");
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching Booking:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch Booking. Please try again.",
      });
    }
  };

  const handleDeleteClick = async (appointmentId) => {
    try {
      await axios.delete(`http://localhost:5001/api/booking/delete/${appointmentId}`);
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment._id !== appointmentId)
      );
      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Booking has been deleted successfully!",
      });
    } catch (error) {
      console.error("Error deleting Booking:", error);
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: "There was an error deleting the Appointment. Please try again.",
      });
    }
  };

  return (
    <div className="p-6 overflow-auto relative z-10">
      <h2 className="text-2xl font-bold mb-4">Booking Information</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-black">
            <th className="border border-gray-300 px-4 py-2">Patient Name</th>
            <th className="border border-gray-300 px-4 py-2">Doctor Name</th>
            <th className="border border-gray-300 px-4 py-2">Hospital Name</th>
            <th className="border border-gray-300 px-4 py-2">Specialization</th>
            <th className="border border-gray-300 px-4 py-2">Phone</th>
            <th className="border border-gray-300 px-4 py-2">Time Slot</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Max Patients</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              <td className="border border-gray-300 px-4 py-2">{appointment.userId.fullName}</td>
              <td className="border border-gray-300 px-4 py-2">{appointment.doctorName}</td>
              <td className="border border-gray-300 px-4 py-2">{appointment.hospitalName}</td>
              <td className="border border-gray-300 px-4 py-2">{appointment.doctorId.specialization || "N/A"}</td>
              <td className="border border-gray-300 px-4 py-2">{appointment.doctorId.phoneNo || "N/A"}</td>
              <td className="border border-gray-300 px-4 py-2">{appointment.appointmentId.appointmentTimeSlot}</td>
              <td className="border border-gray-300 px-4 py-2">{new Date(appointment.appointmentId.appointmentDate).toLocaleDateString("en-CA")}</td>
              <td className="border border-gray-300 px-4 py-2">{appointment.appointmentId.maxPatients}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button onClick={() => handleDeleteClick(appointment._id)} className="bg-red-500 text-white px-2 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Report;
