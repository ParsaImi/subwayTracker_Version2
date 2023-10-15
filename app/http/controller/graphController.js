const Graph = require("../../models/graphModel")

exports.postGraph = async (req , res , next) => {
    const graph = await Graph.create(req.body)
    res.json({
        msg : "done !"
    })
}


exports.getGraph = async (req , res , next) => {
    const graph = await Graph.find()
    res.json(graph)
}