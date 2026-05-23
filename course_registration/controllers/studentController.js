const Student = require('../models/Student');

// GET all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: students.length, data: students });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET single student
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
    res.status(200).json({ success: true, data: student });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST create student
exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({ success: true, message: 'Student created successfully', data: student });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ success: false, message: 'Email or Roll Number already exists' });
    }
    res.status(400).json({ success: false, message: err.message });
  }
};

// PUT update student
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
    res.status(200).json({ success: true, message: 'Student updated successfully', data: student });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
    res.status(200).json({ success: true, message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
