const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    enum: ['Professional Development', 'Networking', 'Training & Workshops'],
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
  time: {
    type: String,
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
  attendees: [{
    name:{
      type: String,
      required: true,
    },
    _id:{
      type: mongoose.Types.ObjectId,
      ref: 'User',
    }
    
  }],
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
  },
  isCanceled:{
    type: Boolean,
    default: false,
  }

});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
