const Course = require('../models/Course');

// GET all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ courseCode: 1 });
    res.status(200).json({ success: true, count: courses.length, data: courses });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET single course
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    res.status(200).json({ success: true, data: course });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST create course
exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({ success: true, message: 'Course created successfully', data: course });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ success: false, message: 'Course code already exists' });
    }
    res.status(400).json({ success: false, message: err.message });
  }
};

// PUT update course
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    res.status(200).json({ success: true, message: 'Course updated successfully', data: course });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE course
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    res.status(200).json({ success: true, message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
