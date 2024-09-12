const express = require('express');
const { registerUser, authUser, getUserProfile, updateUserProfile, updateUserPassword } = require('../controllers/userController');
const  protect  = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/register', registerUser);        
router.post('/login', authUser);                
router.get('/profile', protect, getUserProfile); 
router.put('/profile', protect, updateUserProfile); 
router.put('/password', protect, updateUserPassword); 

module.exports = router;
