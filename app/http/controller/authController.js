const createError = require("http-errors")
const Controller = require("./controller")
const {hashString} = require("../../modules/functions")
const {getOtpSchema , checkOtpSchema} = require("./../validations/users/authSchema")
const utils = require("./../../utils/functions")
const UserModel = require("./../../models/userModel")
class AuthController extends Controller{
    // async register(req , res , next){
    //     const {username , email , mobile , password} = req.body
    //     const hash_password = hashString(password)
    //     const user = await userModel.create({username , email , mobile , password : hash_password})
    //     res.json(user)
    // }


    async getOtp(req , res , next){
         try{
             await getOtpSchema.validateAsync(req.body)
             const {mobile} = req.body
             const code = utils.randomNumberGeneration()
             console.log(code);
             const result = await this.saveUser(mobile, code)
             if(!result) console.log("error");
             return res.json({message : "وارد حساب شدید" , code})
         }
         catch(error){
             next(createError.BadRequest(error.message))
        
         }
    }

    async checkOtp(req , res ,next){
        try{
            await checkOtpSchema.validateAsync(req.body)
            const {mobile , code} = req.body
            const user = await UserModel.findOne({mobile})
            if(!user) throw createError.NotFound("کاربر یافت نشد")
            if(user.otp.code != code ) createError.Unauthorized("کد وارد شده صحیح نیست")
            const now = Date.now()
            if(user.otp.expiresIn < now) console.log("as");
            const token = await utils.signAccessToken(user._id)
            res.json({
                token
            })
        }catch(error){
            next(console.log(error))
        }
    } 


     async saveUser(mobile , code){
         let otp = {
             code,
             expiresIn : new Date().getTime() + 120000
         }
         const result = await this.checkExistUser(mobile)
         if(result){
             return (await this.updateUser(mobile , {otp}))
         }
         return !!(await UserModel.create({
             mobile,
             otp,
             roles : ["USER"]
         }))


     }

     async checkExistUser(mobile){
         const user = await UserModel.findOne({mobile})
         return !!user
     }

     async updateUser(mobile , objectData = {}){
         Object.keys(objectData).forEach(key => {
             if(["" , " " , 0 , null , undefined , "0" , NaN].includes(objectData[key])) delete objectData[key]
            
            
         });
         const updateResult = await UserModel.updateOne({mobile} , {$set : objectData})
         return !!updateResult.modifiedCount
     }
}

module.exports = {
    AuthController : new AuthController()
}