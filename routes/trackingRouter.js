const express = require("express");
const trackingRouter = express.Router();
// Controllers

const { createSnippt } = require("../controllers/users-controllers");



// Public routes


trackingRouter.route("/").get(createSnippt);

module.exports = trackingRouter;