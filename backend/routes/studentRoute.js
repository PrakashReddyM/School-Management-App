const express = require('express');
const router = express.Router();
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');

// Routes for managing students
router.post('/', createStudent);        // Create new student
router.get('/', getAllStudents);        // Get all students
router.get('/:id', getStudentById);     // Get student by ID
router.put('/:id', updateStudent);      // Update student by ID
router.delete('/:id', deleteStudent);   // Delete student by ID

module.exports = router;
