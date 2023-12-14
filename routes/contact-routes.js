const express = require("express");

const { saveContact } = require("../controllers/contacts");

const contactRouter = express.Router();

contactRouter.post("/", saveContact);

module.exports = { contactRouter };