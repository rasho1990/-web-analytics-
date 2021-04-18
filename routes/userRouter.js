const express = require("express");
const userRouter = express.Router();
// Controllers
const { createUser } = require("./../controllers/users-controllers");
const { createSnippt } = require("./../controllers/users-controllers");
const { getNumOfVisits } = require("./../controllers/users-controllers");


// Public routes

userRouter.route("/").get(getNumOfVisits);
userRouter.route("/image").get(createSnippt);

module.exports = userRouter;