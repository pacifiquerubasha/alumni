const News = require("../models/News");
const Activity = require("../models/Activity");

const createNews = async(req, res)=>{
    try{
        const {
            title,
            date,
            description,
            link
        } = req.body

        const imagePath = req?.file?.filename;

        const news = await News.create({
            title,
            date,
            description,
            link,
            image: imagePath
        });

        // Create Activity
        const activity = await Activity.create({
            message: "Created a news",
            type: "create",
            path: `/news/${news._id}`,
            user: "65769c2b60965b35130ab36d"
        });

        res.status(201).json({
            message: "News created successfully",
            data: {news}
        });

    }catch(error){
        res.status(500).json({error});
    }
}

const getAllNews = async(req, res)=>{
    try{
        const news = await News.find({});

        res.status(200).json({
            message: "All news",
            data: {news}
        });

    }catch(error){
        res.status(500).json({error});
    }
}

const getNewsById = async(req, res)=>{
    try{
        const {id} = req.params;

        const news = await News.findById(id);

        res.status(200).json({
            message: "News",
            data: {news}
        });

    }catch(error){
        res.status(500).json({error});
    }
}

const updateNews = async(req, res)=>{
    try{
        const {id} = req.params;

        const {
            title,
            date,
            description,
            link
        } = req.body

        const imagePath = req?.file?.filename;

        const news = await News.findByIdAndUpdate(id, {
            title,
            date,
            description,
            link,
            image: imagePath
        });

        // Create Activity

        const activity = await Activity.create({
            message: "Updated a news",
            type: "update",
            path: `/news/${news._id}`,
            user: "65769c2b60965b35130ab36d"
        });

        res.status(200).json({
            message: "News updated successfully",
            data: {news}
        });

    }catch(error){
        res.status(500).json({error});
    }
}

const deleteNews = async(req, res)=>{
    try{
        const {id} = req.params;

        const news = await News.findByIdAndDelete(id);

        // Create Activity
        const activity = await Activity.create({
            message: "Deleted a news",
            type: "delete",
            path: `/news/${news._id}`,
            user: "65769c2b60965b35130ab36d"
        });

        res.status(200).json({
            message: "News deleted successfully",
            data: {news}
        });

    }catch(error){
        res.status(500).json({error});
    }
}

module.exports = {
    createNews,
    getAllNews,
    getNewsById,
    updateNews,
    deleteNews
}