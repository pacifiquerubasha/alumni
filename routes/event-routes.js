const express = require("express");
const { createEvent, updateEvent, deleteEvent, getAllEvents, getEvent, getUpcomingEvents, getEventsBySearch, registerForEvent, getMyEvents } = require("../controllers/events");
const upload = require("../utils/upload");

const eventsRouter = express.Router();

eventsRouter.post("/", upload.single('image'), createEvent)
eventsRouter.get("/search", getEventsBySearch)
eventsRouter.get("/user/:id", getMyEvents)
eventsRouter.put("/:id", updateEvent)
eventsRouter.delete("/:id", deleteEvent)
eventsRouter.get("/", getAllEvents)
eventsRouter.get("/upcoming", getUpcomingEvents)
eventsRouter.get("/:id", getEvent)
eventsRouter.post("/event/rsvp", registerForEvent)



module.exports = {eventsRouter};

