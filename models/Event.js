const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    enum: ['Professional Development', 'Networking', 'Campus Events'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  organizer: {
      type: String,
      required: true,
  },
  speakers: [String], 
  sponsors: [String], 
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String, 
  },
  tags: [String],
  attendees: [String],
  capacity: {
    type: Number,
    required: true,
  },
  totalRSVPS:{
    type: Number,
    default: 0,
  },
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }

});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
