const router = require('express').Router(); // Fixed: Use Router() directly
const userAuthController = require('../controller/userController');

// Routes
router.post('/signup', userAuthController.signup);
router.post('/login', userAuthController.login);

// Corrected: Use module.exports instead of module.export
module.exports = router; 
