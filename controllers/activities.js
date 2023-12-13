const Activity = require("../models/Activity");

const getRecentActivities = async(req, res)=>{
    const {id} = req.params;
    try{
        const activities = await Activity.find({user: id}).sort('-createdAt').limit(5).exec();

        res.status(200).json({
            message: "Recent activities",
            data: {activities}
        });
    }catch(err){
        res.status(500).json({err});
    }

}

const getAllUserActivities = async(req, res)=>{
    const {id} = req.params;
    try{
        const activities = await Activity.find({user: id}).sort('-createdAt').exec();

        res.status(200).json({
            message: "All activities",
            data: {activities}
        });
    }catch(err){
        res.status(500).json({err});
    }

}

module.exports = {
    getRecentActivities,
    getAllUserActivities
}