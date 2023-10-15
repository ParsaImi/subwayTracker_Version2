const jwt = require("jsonwebtoken")
const errorCreator = require("http-errors")
const UserModel = require("./../../models/userModel")
exports.verifyAccessToken = (req , res , next) => {
    try{
    console.log("starting first middlewear");
    const headers = req.headers
    console.log(headers.jwt);
    const token = headers.jwt
        jwt.verify(token , process.env.JWT_SECRET , async (err , payload) => {
            const {userID} = payload 
            const user = await UserModel.findById(userID)
            req.user = user
            console.log("saving user in req.user");
            return next()
            
        }) 
        console.log("after verfying");
        
}
    catch(err){
        console.log("we have some issue");
        next(console.log(err))
    }
    
}
