const express = require('express');
const router = express.Router();
const bookingController = require('../controller/bookingController.js');

router.post('/create', bookingController.createBooking);
router.get('/', bookingController.getBookings);
router.delete('/delete/:id', bookingController.deleteBooking);

module.exports = router; 