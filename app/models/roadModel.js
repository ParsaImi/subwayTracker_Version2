const mongoose = require('mongoose')
const roadSchema = new mongoose.Schema({
    name : {type : String , required : [true , "a state needs name!"]},
    line : {type : Number , required : [true , "a state needs a line!"]},
    state : {type : Number , required : [true , "a state needs a num!"]}

})

const Road = mongoose.model("Road" , roadSchema)
module.exports = Road