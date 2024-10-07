const router = require('express').Router(); // Fixed: Use Router() directly
const userAuthController = require('../controller/userController');

// Routes
router.post('/signup', userAuthController.signup);
router.post('/login', userAuthController.login);
router.get('/profile/:userId', userAuthController.getProfile);
router.put('/update/:userId', userAuthController.updateUser); 
module.exports = router; 
