
const express = require('express');
const router = express.Router();
const appointmentController = require('../controller/AppointmentController');


router.post('/create/appointments', appointmentController.createAppointment);
router.get('/appointments', appointmentController.getAppointments);

module.exports = router;
