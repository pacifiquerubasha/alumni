const express = require("express");
const {
    createNews,
    getAllNews,
    getNewsById,
    updateNews,
    deleteNews

} = require("../controllers/news");

const upload = require("../utils/upload");

const newsRouter = express.Router();

newsRouter.post("/", upload.single('image'), createNews);
newsRouter.get("/", getAllNews);
newsRouter.get("/:id", getNewsById);
newsRouter.put("/:id", upload.single('image'), updateNews);
newsRouter.delete("/:id", deleteNews);

module.exports = {newsRouter};