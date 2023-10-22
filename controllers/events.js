const express = require("express");
const Event = require("../models/Event");

const createEvent = async(req, res)=>{
    try {

        const {
          title,
          eventType,
          description,
          organizer,
          speakers,
          sponsors,
          date,
          location,
          image
        } = req.body;
    

        const newEvent = await Event.create({
          title,
          eventType,
          description,
          organizer,
          speakers,
          sponsors,
          date,
          location,
          image
        });
    
        return res.status(201).json({
            message: 'success',
            data: {
                event: newEvent,
            },
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'fail',
            data: {
                message: error.message,
            },
        });
      }
}

const updateEvent = async(req, res)=>{
    try {
        const {id} = req.params;
        const {
          title,
          eventType,
          description,
          organizer,
          speakers,
          sponsors,
          date,
          location,
          image
        } = req.body;
    
        const event = await Event.findOneAndUpdate(
          { _id: id },
          {
            title,
            eventType,
            description,
            organizer,
            speakers,
            sponsors,
            date,
            location,
            image
          },
          { new: true }
        );
    
        return res.status(200).json({
            message: 'success',
            data: {
                event,
            },
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'fail',
            data: {
                message: error.message,
            },
        });
      }
}


const deleteEvent = async(req, res)=>{
    try {
        const {id} = req.params;
        await Event.deleteOne({ _id: id });
    
        return res.status(200).json({
            message: 'success',
            data: {
                event: null,
            },
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'fail',
            data: {
                message: error.message,
            },
        });
      }
}

const getAllEvents = async(req, res)=>{
    try {
        const events = await Event.find();
    
        return res.status(200).json({
            message: 'success',
            data: {
                events,
            },
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'fail',
            data: {
                message: error.message,
            },
        });
      }
}

const getEvent = async(req, res)=>{
    try {
        const {id} = req.params;
        const event = await Event.findById(id);
    
        return res.status(200).json({
            message: 'success',
            data: {
                event,
            },
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'fail',
            data: {
                message: error.message,
            },
        });
      }
}



const getEventsBySearch = async(req, res)=> {
    try {
        const {eventType, organizer, date} = req.query;

        let queryObj = {};
        if(eventType) queryObj.eventType = eventType.split("-").join(" ");

        if(organizer){
            queryObj["organizer.name"] = organizer.split("-").join(" ");
        }
        if(date) queryObj.date = date;
        
        const events = await Event.find(queryObj);
    
        return res.status(200).json({
            message: 'success',
            data: {
                events,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'fail',
            data: {
            message: error.message,
            },
        });
    }
}


const getUpcomingEvents = async(req, res)=>{
    try {
        const events = await Event.find({date: {$gte: new Date()}});
    
        return res.status(200).json({
            message: 'success',
            data: {
                events,
            },
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'fail',
            data: {
                message: error.message,
            },
        });
      }
}


module.exports = {
    createEvent,
    updateEvent,
    deleteEvent,
    getAllEvents,
    getEvent,
    getEventsBySearch,
    getUpcomingEvents

}