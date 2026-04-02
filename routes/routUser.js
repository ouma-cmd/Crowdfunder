const express = require("express");

const middleware = require("../middleware/userMiddl");

const { registerUserController, loginUserController  } = require("../controller/UserController");


const route = express.Router();

// register

route.post("/register", middleware, registerUserController);

// login

route.post("/login", loginUserController )

module.exports = route;
