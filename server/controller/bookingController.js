const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  try {
    const {
      userId,
      doctorId,
      appointmentId,
      date,
      time,
      doctorName,
      hospitalName,
      hospitalAddress,
      city,
      hospitalNumber
    } = req.body;

    const booking = new Booking({
      userId,
      doctorId,
      appointmentId,
      date,
      time,
      doctorName,
      hospitalName,
      hospitalAddress,
      city,
      hospitalNumber
    });

    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId") // Populating user details
      .populate("doctorId") // Populating doctor details
      .populate("appointmentId"); // Populating appointment details

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};

exports.getBookingsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ userId })
      .populate("userId") // Populating user details
      .populate("doctorId") // Populating doctor details
      .populate("appointmentId"); // Populating appointment details

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    await Booking.findByIdAndDelete(id);
    res.status(200).json({ message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting booking", error });
  }
};
