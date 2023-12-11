const express = require("express");
const { startConversation, getUserConversations, getConversationMessages, deleteConversation } = require("../controllers/conversation");

const conversationsRouter = express.Router();


conversationsRouter.post("/", startConversation);
conversationsRouter.get("/user/:userId", getUserConversations);
conversationsRouter.get("/:conversationId/messages", getConversationMessages);
conversationsRouter.delete("/:id", deleteConversation);

module.exports = {conversationsRouter};