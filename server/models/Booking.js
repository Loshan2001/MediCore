const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
       
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        
    },
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
      
    },
    date: {
        type: Date,
      
    },
    time: {
        type: String,
    
    },
    doctorName: {
        type: String,
        
    },
    hospitalName: {
        type: String,
       
    },
    hospitalAddress: {
        type: String,
     
    },
    city: {
        type: String,
        
    },
    hospitalNumber: {
        type: String,
       
    }
});

module.exports = mongoose.model("Booking", BookingSchema);
