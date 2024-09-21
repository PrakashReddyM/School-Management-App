const Teacher = require('../models/teacherModel');

// Create a new teacher
const createTeacher = async (req, res) => {
  try {
    const {name,gender,dob,contactDetails,salary,classAssigned} = req.body;
    const newTeacher = await Teacher.create({name,gender,dob,contactDetails,salary,classAssigned});
    const populatedTeacher = await Teacher.findById(newTeacher._id).populate('classAssigned', 'name');
    res.status(201).json(populatedTeacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all teachers
const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate('classAssigned','name');
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get teacher by ID
const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate('classAssigned','name');
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update teacher by ID
const updateTeacher = async (req, res) => {
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json(updatedTeacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete teacher by ID
const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json({ message: 'Teacher deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
};
