const router = require('express').Router(); // Fixed: Use Router() directly
const doctorController = require('../controller/doctorController');


router.post('/assign', doctorController.assignDoctor);
router.delete('/delete/:id', doctorController.deleteDoctor);
router.put('/update/:userId', doctorController.updateDoctor);
router.get('/search', doctorController.searchDoctor); 
router.get('/getAll', doctorController.getAllDoctors); 
router.get('/:id', doctorController.getDoctorById); 
module.exports = router; 
