const Class = require('../models/classModel');

// Create a new class
const createClass = async (req, res) => {
  try {
    const newClass = await Class.create(req.body);
    const populatedClass = await Class.findById(newClass._id)
      .populate('teacher', 'name')
      .populate('students');
    res.status(201).json(populatedClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all classes
const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate('teacher', 'name').populate('students');
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get class by ID
const getClassById = async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id).populate('teacher', 'name').populate('students');
    if (!classData) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.status(200).json(classData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update class by ID
const updateClass = async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete class by ID
const deleteClass = async (req, res) => {
  try {
    const classData = await Class.findByIdAndDelete(req.params.id);
    if (!classData) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.status(200).json({ message: 'Class deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
};
