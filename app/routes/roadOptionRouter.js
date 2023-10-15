const express = require('express')
const router = express.Router()
const RoadController = require("../http/controller/roadController")
router.post("/change" , RoadController.numtonamesiet)

module.exports = router