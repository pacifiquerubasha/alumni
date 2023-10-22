const express = require("express");
const { createEvent, updateEvent, deleteEvent, getAllEvents, getEvent, getUpcomingEvents, getEventsBySearch } = require("../controllers/events");


const eventsRouter = express.Router();

eventsRouter.post("/", createEvent)
eventsRouter.get("/search", getEventsBySearch)
eventsRouter.put("/:id", updateEvent)
eventsRouter.delete("/:id", deleteEvent)
eventsRouter.get("/", getAllEvents)
eventsRouter.get("/upcoming", getUpcomingEvents)
eventsRouter.get("/:id", getEvent)



module.exports = {eventsRouter};

