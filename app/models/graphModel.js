const mongoose = require('mongoose')
const graphSchema = new mongoose.Schema({
    graph : {type : Object}
})

const Graph = mongoose.model("Graph" , graphSchema)
module.exports = Graph