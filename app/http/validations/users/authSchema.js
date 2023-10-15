const joi = require("@hapi/joi")
const getOtpSchema = joi.object({
    mobile : joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("شماره موبایل را به درستی وارد نکرده اید !"))
})

const checkOtpSchema = joi.object({
    mobile : joi.string().length(11),
    code : joi.string().min(4).max(6).error(new Error("کد ارسال شده صحیح نیست !"))
})

module.exports = {
    checkOtpSchema,
    getOtpSchema
}