const mongoose = require("mongoose")
const TeamSchema = new mongoose.Schema({
    name : {type : String},
    users : {type : [mongoose.Types.ObjectId]},
    desc : {type : String},
    image : {type : String},
    owner : {type : mongoose.Types.ObjectId},
    category : {type : mongoose.Types.ObjectId},
    commnet : {type : [] , default : []},
    like : {type : [mongoose.Types.ObjectId] , default : []}
}, {timestamps : true})


const Team = mongoose.model("Team" , TeamSchema)
module.exports = {
    Team
}