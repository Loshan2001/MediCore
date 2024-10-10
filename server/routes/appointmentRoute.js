
const express = require('express');
const router = express.Router();
const appointmentController = require('../controller/AppointmentController');


router.post('/create', appointmentController.createAppointment);
router.get('/', appointmentController.getAppointments);
router.delete('/delete/:id', appointmentController.deleteAppointment);

module.exports = router;
