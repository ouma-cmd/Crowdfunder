
const express = require("express")
const router = express.Router()

const controller = require("../controller/projectController")
const authMiddlware = require("../middleware/authenticationMiddle")

router.post("/:id/invest", authMiddlware, controller.investController)
