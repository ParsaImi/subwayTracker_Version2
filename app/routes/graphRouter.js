const express = require('express')
const router = express.Router()
const graphController = require("../http/controller/graphController")

router.post('/postgraph' , graphController.postGraph)
router.get("/getgraph" , graphController.getGraph)

module.exports = router