const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  rollNumber: {
    type: String,
    required: [true, 'Roll number is required'],
    unique: true,
    trim: true
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    enum: ['Computer Science', 'Software Engineering', 'Information Technology', 'Electrical Engineering']
  },
  semester: {
    type: Number,
    required: [true, 'Semester is required'],
    min: 1,
    max: 8
  }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
