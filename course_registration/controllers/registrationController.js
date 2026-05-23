const Registration = require('../models/Registration');
const Course = require('../models/Course');

// GET all registrations
exports.getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate('student', 'name rollNumber email')
      .populate('course', 'courseCode title creditHours')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: registrations.length, data: registrations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET registration by ID
exports.getRegistrationById = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id)
      .populate('student', 'name rollNumber email department')
      .populate('course', 'courseCode title creditHours instructor');
    if (!registration) return res.status(404).json({ success: false, message: 'Registration not found' });
    res.status(200).json({ success: true, data: registration });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST register student in a course
exports.createRegistration = async (req, res) => {
  try {
    const { student, course } = req.body;

    // Check course capacity
    const courseDoc = await Course.findById(course);
    if (!courseDoc) return res.status(404).json({ success: false, message: 'Course not found' });

    const enrolledCount = await Registration.countDocuments({ course, status: 'approved' });
    if (enrolledCount >= courseDoc.maxCapacity) {
      return res.status(400).json({ success: false, message: 'Course is full. Cannot register.' });
    }

    const registration = await Registration.create(req.body);
    const populated = await registration.populate([
      { path: 'student', select: 'name rollNumber' },
      { path: 'course', select: 'courseCode title' }
    ]);
    res.status(201).json({ success: true, message: 'Registration created successfully', data: populated });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ success: false, message: 'Student is already registered in this course' });
    }
    res.status(400).json({ success: false, message: err.message });
  }
};

// PUT update registration (approve/drop/grade)
exports.updateRegistration = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('student', 'name rollNumber').populate('course', 'courseCode title');
    if (!registration) return res.status(404).json({ success: false, message: 'Registration not found' });
    res.status(200).json({ success: true, message: 'Registration updated successfully', data: registration });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE registration
exports.deleteRegistration = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);
    if (!registration) return res.status(404).json({ success: false, message: 'Registration not found' });
    res.status(200).json({ success: true, message: 'Registration deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
