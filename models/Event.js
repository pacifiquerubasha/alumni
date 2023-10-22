const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    enum: ['professional development', 'networking', 'campus events'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  organizer: {
    name: {
      type: String,
      required: true,
    },
    about: String,
    email: String,
    jobTitle: String,
    company: String,
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
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
