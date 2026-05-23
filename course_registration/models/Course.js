const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: [true, 'Course code is required'],
    unique: true,
    uppercase: true,
    trim: true
  },
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true
  },
  creditHours: {
    type: Number,
    required: [true, 'Credit hours are required'],
    min: 1,
    max: 4
  },
  instructor: {
    type: String,
    required: [true, 'Instructor name is required'],
    trim: true
  },
  maxCapacity: {
    type: Number,
    required: [true, 'Maximum capacity is required'],
    default: 30
  },
  department: {
    type: String,
    required: [true, 'Department is required']
  }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
