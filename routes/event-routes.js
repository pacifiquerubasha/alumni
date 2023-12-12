const express = require("express");
const { 
    createEvent, 
    updateEvent, 
    deleteEvent, 
    getAllEvents, 
    getEvent, 
    getUpcomingEvents, 
    getEventsBySearch, 
    registerForEvent, 
    getMyEvents,
    getMyRegisteredEvents,
    testCalendarInvite } = require("../controllers/events");
const upload = require("../utils/upload");

const eventsRouter = express.Router();

eventsRouter.get("/test", testCalendarInvite)


eventsRouter.post("/", upload.single('image'), createEvent)
eventsRouter.get("/search", getEventsBySearch)
eventsRouter.get("/user/:id", getMyEvents)
eventsRouter.put("/:id", upload.single('image'), updateEvent)
eventsRouter.delete("/:id", deleteEvent)
eventsRouter.get("/", getAllEvents)
eventsRouter.get("/upcoming", getUpcomingEvents)
eventsRouter.get("/:id", getEvent)
eventsRouter.post("/event/rsvp", registerForEvent)
eventsRouter.get("/user/:id/registered", getMyRegisteredEvents)


module.exports = {eventsRouter};

