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
    cancelEvent } = require("../controllers/events");
const upload = require("../utils/upload");
const {authMiddleware} = require("../middlewares/authMiddleware")

const eventsRouter = express.Router();


eventsRouter.post("/", authMiddleware, upload.single('image'), createEvent)
eventsRouter.get("/search", getEventsBySearch)
eventsRouter.get("/user/:id", authMiddleware, getMyEvents)
eventsRouter.put("/:id", authMiddleware, upload.single('image'), updateEvent)
eventsRouter.delete("/:id", authMiddleware, deleteEvent)
eventsRouter.get("/", authMiddleware, getAllEvents)
eventsRouter.get("/upcoming", getUpcomingEvents)
eventsRouter.get("/:id", getEvent)
eventsRouter.post("/event/rsvp", authMiddleware, registerForEvent)
eventsRouter.get("/user/:id/registered", authMiddleware, getMyRegisteredEvents)
eventsRouter.put("/cancel/:id", authMiddleware, cancelEvent)


module.exports = {eventsRouter};

