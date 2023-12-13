const express = require("express");
const RSVP = require("../models/RSVP");
const Event = require("../models/Event");
const User = require("../models/User");
const { eventRegistrationTemplate, eventCancellationTemplate } = require("../utils/mailTemplates");
const { sendEmail } = require("../utils/mailer");
const {generateInviteAlternatives} = require("../utils/generateInvite");
const Activity = require("../models/Activity");


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

        // Create an activity with message, path, type and user
        const activity = await Activity.create({
            message: `You created an event`,
            path: `/alumni-events/${newEvent._id}`,
            type: "create",
            user: user._id,
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

        // Create an activity with message, path, type and user
        const activity = await Activity.create({
            message: `You updated the event ${event.title}`,
            path: `/alumni-events/${event._id}`,
            type: "update",
            user: event.createdBy,
        });
    
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
        //Find user for this event
        const event = await Event.findByIdAndDelete(id);
        // Create an activity with message, path, type and user
        const activity = await Activity.create({
            message: `You deleted an event`,
            path: `/my-events`,
            type: "delete",
            user: event.createdBy,
        });
    
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
        const events = await Event.find().sort('-date');
    
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

        const events = await Event.find({date: {$gte: new Date()}, isCanceled:false}).sort({date: 1});
    
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

            const activity = await Activity.create({
                message: `You registered for an event`,
                path: `/alumni-events/${event._id}`,
                type: "create",
                user: user._id,
            });


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
        const events = await RSVP.find({userId: id}).populate("eventId", "title date isCanceled");
    
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

const cancelEvent = async(req, res)=>{
    try {
        const {id} = req.params;        
        //Fetch event and populate attendee emails
        const event = await Event.findById(id).populate("attendees._id", "email");

        event.isCanceled = true;
        await event.save();

        //Send email to all users in the attendees array
        const attendees = event.attendees;

        let mailOptions = {
            from: process.env.MAILER_EMAIL,
            subject: "Event Cancellation",
        }

        attendees.forEach(async attendee=>{
            mailOptions.to = attendee._id.email;
            mailOptions.html = eventCancellationTemplate(attendee.name, event),

            sendEmail(mailOptions);
        }
        )

        // Create an activity with message, path, type and user
        const activity = await Activity.create(
            [{
                message: `Your event was canceled`,
                path: `/alumni-events/${event._id}`,
                type: "delete",
                user: event.createdBy,
            },
            {
                message: `You canceled an event`,
                path: `/alumni-events/${event._id}`,
                type: "delete",
                user: "65769c2b60965b35130ab36d",
            }
            ]
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
    cancelEvent

}