const express = require("express");
const {
    createNews,
    getAllNews,
    getNewsById,
    updateNews,
    deleteNews

} = require("../controllers/news");

const upload = require("../utils/upload");
const {authMiddleware, adminMiddleware} = require("../middlewares/authMiddleware")

const newsRouter = express.Router();

newsRouter.post("/", adminMiddleware, upload.single('image'), createNews);
newsRouter.get("/", authMiddleware, getAllNews);
newsRouter.get("/:id", adminMiddleware, getNewsById);
newsRouter.put("/:id", adminMiddleware, upload.single('image'), updateNews);
newsRouter.delete("/:id", adminMiddleware, deleteNews);

module.exports = {newsRouter};