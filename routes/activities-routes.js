const express = require("express");

const {getAllUserActivities, getRecentActivities} = require("../controllers/activities");

const activityRouter = express.Router();

activityRouter.get("/recent/:id", getRecentActivities);
activityRouter.get("/:id", getAllUserActivities);

module.exports = {activityRouter};