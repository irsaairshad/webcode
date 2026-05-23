const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: [true, 'Student is required']
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Course is required']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'dropped'],
    default: 'pending'
  },
  grade: {
    type: String,
    enum: ['A', 'B+', 'B', 'C+', 'C', 'D', 'F', 'N/A'],
    default: 'N/A'
  }
}, { timestamps: true });

// Prevent duplicate registration of same student in same course
registrationSchema.index({ student: 1, course: 1 }, { unique: true });

module.exports = mongoose.model('Registration', registrationSchema);
