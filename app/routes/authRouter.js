// class Controller{
//     common(){
//         return "test string"
//     }
// }
const router = require("express").Router()
const {AuthController} = require("../http/controller/authController")
const { expressValidatorMapper } = require("../http/middlewares/checkErrors")
// const testController = require("../http/controller/testController")
// const finalController = new testController
router.post("/login" , AuthController.getOtp)
router.post("/check-otp" , AuthController.checkOtp)


module.exports = router