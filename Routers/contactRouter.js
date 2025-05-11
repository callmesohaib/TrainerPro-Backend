const express = require("express");
const contactRouter = express.Router();
const { contact } = require("../Controllers/contactController");
contactRouter.post("/contact", contact);
module.exports = contactRouter;
