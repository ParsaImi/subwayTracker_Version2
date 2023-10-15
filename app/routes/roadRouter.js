const express = require('express')
const router = express.Router()
const RoadController = require("../http/controller/roadController")
router.get("/all" , RoadController.getRoads)
router.get("/:name" , RoadController.getWithName )
router.post("/createroads" , RoadController.postRoads)
router.get("/nametonum/:source/:dst" , RoadController.nametonum)
router.delete("/delete" , RoadController.removeRoad)
module.exports = router