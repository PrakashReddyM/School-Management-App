const express = require('express');
const router = express.Router();
const {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} = require('../controllers/teacherController');

// Routes for managing teachers
router.post('/', createTeacher);        // Create new teacher
router.get('/', getAllTeachers);        // Get all teachers
router.get('/:id', getTeacherById);     // Get teacher by ID
router.put('/:id', updateTeacher);      // Update teacher by ID
router.delete('/:id', deleteTeacher);   // Delete teacher by ID

module.exports = router;
