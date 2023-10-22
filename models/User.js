const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['alumni', 'manager'],
    default: 'alumni',
  },
  jobTitle: {
    type: String,
  },
  company: {
    type: String,
  },
  nationality: {
    type: String,
  },
  yearOfGraduation: {
    type: Number,
  },
  eventsParticipating: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  }],
  eventsOrganized: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  }],
  emailVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationCode: {
    type: String,
  },
  emailVerificationCodeExpiry: {
    type: Date,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
