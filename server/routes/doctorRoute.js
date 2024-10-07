const router = require('express').Router(); // Fixed: Use Router() directly
const doctorController = require('../controller/doctorController');


router.post('/assign', doctorController.assignDoctor);
router.delete('/delete/:id', doctorController.deleteDoctor);
router.put('/update/:userId', doctorController.updateDoctor);
router.get('/getAll', doctorController.getAllDoctors); 
module.exports = router; 
