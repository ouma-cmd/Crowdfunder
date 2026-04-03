const express = require("express");
const route = express.Router();

const {
  investController,
  getAllInvestController,
} = require("../controller/invetController");
const authMiddlware = require("../middleware/authenticationMiddle");

route.post("/:id/invest", authMiddlware, investController);
route.get("/", authMiddlware, getAllInvestController);

module.exports = route;
