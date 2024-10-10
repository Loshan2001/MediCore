const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  try {
    const { userId, hospitalId, appointmentId } = req.body;

    const booking = new Booking({
      userId,
      hospitalId,
      appointmentId,
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
      .populate("userId")
      .populate("hospitalId")
      .populate("appointmentId");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};

exports.getBookingsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const bookings = await Booking.find({ userId })
        .populate("userId")
        .populate("hospitalId")
        .populate("appointmentId");
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings", error });
    }
}


exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    await Booking.findByIdAndDelete(id);
    res.status(200).json({ message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting booking", error });
  }
};
