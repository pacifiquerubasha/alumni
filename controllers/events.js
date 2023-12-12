const express = require("express");
const RSVP = require("../models/RSVP");
const Event = require("../models/Event");
const User = require("../models/User");
const { eventRegistrationTemplate } = require("../utils/mailTemplates");
const { sendEmail } = require("../utils/mailer");
const {generateInviteAlternatives} = require("../utils/generateInvite");

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
          time,
          location,
          tags,
          attendees,
          capacity,
          createdBy
        } = req.body;

        const imagePath = req?.file?.filename;
        

        const newEvent = await Event.create({
          title,
          eventType,
          description,
          organizer,
          speakers,
          sponsors,
          date,
          time,
          location,
          image : imagePath,
          tags,
          attendees,
          capacity,
          createdBy
        });

        // Find user
        const user = await User.findById(createdBy);
        user.eventsOrganized.push(newEvent._id);
        await user.save();
    

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
            time,
            location,
            tags,
            attendees,
            capacity,
            createdBy
          } = req.body;

        const imagePath = req?.file?.filename;
    
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
            time,
            location,
            tags,
            attendees,
            capacity,
            createdBy,
            image: imagePath,
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

const getMyEvents = async(req, res)=>{
    try {
        const {id} = req.params;
        const events = await Event.find({createdBy: id});
    
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

const registerForEvent = async(req, res)=>{
    const {eventId, userId} = req.body;

    let eventRegistration = null;

    try {
        eventRegistration = await RSVP.findOne({eventId, userId});
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'fail',
            data: {
            message: error.message,
            },
        });
    }
    if(!eventRegistration){
        try {
            eventRegistration = await RSVP.create({eventId, userId});
            const event = await Event.findById(eventId);
            const user = await User.findById(userId);

            event.attendees.push({
                name : `${user.firstName} ${user.lastName}`,
                _id: user._id
            });

            event.totalRSVPS++;
            await event.save();

            // Add event to user's eventsParticipating array
            user.eventsParticipating.push(eventId);            
            await user.save();

            const randomID = Math.floor(1000 + Math.random() * 9000);

            // Send email to user

            // Create a Date object from the date string
            const [hours, minutes] = event.time.split(':').map(Number);
            
            const startTime = new Date(event.date);
            startTime.setHours(hours);
            startTime.setMinutes(minutes);

            const endTime = new Date(event.date);
            endTime.setHours(hours + 2);

            sendInvite(
                {
                    from: process.env.MAILER_EMAIL,
                    to: user.email,
                    subject: "Event Registration Confirmation",
                    html: eventRegistrationTemplate(randomID, user, event),
                },
                [
                    startTime,
                    endTime,
                    event.title,
                    event.description,
                    event.location,
                    "https://www.alueducation.com",
                    event.organizer,
                    process.env.MAILER_EMAIL,
                    user.email,
                    `${user.firstName} ${user.lastName}`,
    
                ]
            )      


            return res.status(201).json({
                message: 'success',
                data: {
                    eventRegistration,
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

    else{
        res.status(400).json({
            message: 'fail',
            data: {
            message: "You have already registered for this event",
            },
        });
    }



}

const getMyRegisteredEvents = async(req, res)=>{
    try {
        const {id} = req.params;
        const events = await RSVP.find({userId: id}).populate("eventId", "title date");
    
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

const sendInvite = (initialMailOptions, inviteOptions)=>{
    const mailOptions = {
        ...initialMailOptions,
    }

    const alternatives = generateInviteAlternatives(...inviteOptions)
    if(alternatives){
        mailOptions['alternatives'] = alternatives;
        mailOptions['alternatives']['contentType'] = 'text/calendar'
        mailOptions['alternatives']['content'] 
    }

    sendEmail(mailOptions); 

}

const testCalendarInvite = async(req, res)=>{
    try {

        sendInvite(
            {
                from: process.env.MAILER_EMAIL,
                to: "p.kishinyambwe@alustudent.com",
                subject: "Test Calendar Invite 2",
            },
            [
                new Date("2023-12-15T06:01:07.795Z"),
                new Date("2023-12-15T08:01:07.795Z"),
                "Test Event",
                "This is a test event",
                "Test Location",
                "https://www.google.com",
                "Test Organizer",
                process.env.MAILER_EMAIL,
                "p.kishinyambwe@alustudent.com",
                "Pacifique Rubasha",

            ]
        )          
        

        return res.status(200).json({
            message: 'success',
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
    getUpcomingEvents,
    registerForEvent,
    getMyEvents,
    getMyRegisteredEvents,
    testCalendarInvite

}