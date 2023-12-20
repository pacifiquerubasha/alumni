const express = require("express");

const {getAllUserActivities, getRecentActivities} = require("../controllers/activities");
const {authMiddleware} = require("../middlewares/authMiddleware")


const activityRouter = express.Router();
activityRouter.use(authMiddleware);

activityRouter.get("/recent/:id", getRecentActivities);
activityRouter.get("/:id", getAllUserActivities);

module.exports = {activityRouter};