const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    username : {type : String , unique : true , lowercase : true},
    email : {type : String , unique : true , lowercase : true},
    mobile : {type : String , required : true},
    password : {type : String},
    role : {type : [String] , default : ["user"]},
    otp : {type : Object , default : {
        code : "",
        expires : new Date().getDate() + 120
    }} 
} , {timestamps : true})


const User = mongoose.model("User" , UserSchema)
module.exports = User