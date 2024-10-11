const router = require('express').Router(); // Fixed: Use Router() directly
const HospitalController = require('../controller/hospitalController');


router.post('/assign', HospitalController.assignHospital);
router.delete('/delete/:id', HospitalController.deleteHospital);
router.put('/update/:id', HospitalController.updateHospital);
router.get('/search', HospitalController.searchHospital); 
router.get('/getAll', HospitalController.getAllHospital); 
router.get('/', HospitalController.getAllHospitals);
module.exports = router; 
