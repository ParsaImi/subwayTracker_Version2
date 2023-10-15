const express = require('express')
const middlewears = require("../http/middlewares/verifyAccessToken")
const router = express.Router()
const RoadController = require("../http/controller/roadController")
router.get("/progress" , middlewears.verifyAccessToken , RoadController.sayhellow)

module.exports = router