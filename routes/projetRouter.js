const express = require("express")
const router = express.Router()

const controller = require("../controller/projectController")
const authMiddlware = require("../middleware/authenticationMiddle")

router.post("/", authMiddlware, controller.createProjectController)

router.get("/", controller.getAllProjectsController)

router.get("/:id", controller.getProjectController)

router.put("/:id", authMiddlware, controller.updateProjectController)

router.delete("/:id", authMiddlware, controller.deleteProjectController)


module.exports = router
