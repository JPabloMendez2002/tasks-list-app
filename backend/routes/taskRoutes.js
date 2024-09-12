const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', protect, createTask); 
router.get('/consult', protect, getTasks);    
router.put('/update/:id', protect, updateTask); 
router.delete('/delete/:id', protect, deleteTask); 
module.exports = router;
