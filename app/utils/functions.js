const jwt = require("jsonwebtoken")
const UserModel = require("./../models/userModel")
exports.randomNumberGeneration = () => {
    return Math.floor((Math.random() * 90000) + 10000)
}


exports.signAccessToken = (userId) => {
    return new Promise(async (resolve , reject) => {
        const user = await UserModel.findById(userId)
        const payload = {
            mobile : user.mobile,
            userID : user._id
        }
        const secret = ""
        const options = {
            expiresIn : "1h"
        }
    const token = jwt.sign(payload , process.env.JWT_SECRET , options)
    resolve(token)

    })
}

// exports.verifyAccessToken = () => {
    
// }