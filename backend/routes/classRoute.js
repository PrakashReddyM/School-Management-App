const express = require('express');
const router = express.Router();
const {
    createClass,
    getClassById,
    updateClass,
    deleteClass,
    getAllClasses,
} = require('../controllers/classController');

// Routes for managing classes
router.post('/', createClass);        // Create new class
router.get('/', getAllClasses);       // Get all classes
router.get('/:id', getClassById);     // Get a single class by ID
router.put('/:id', updateClass);      // Update class by ID
router.delete('/:id', deleteClass);   // Delete class by ID

module.exports = router;
