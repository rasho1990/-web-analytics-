const express = require("express");
const userRouter = express.Router();
// Controllers

const { getNumOfVisits } = require("./../controllers/users-controllers");

// Public routes

userRouter.route("/").get(getNumOfVisits);

module.exports = userRouter;