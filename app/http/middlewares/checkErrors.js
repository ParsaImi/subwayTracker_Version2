const { validationResult } = require("express-validator")

function expressValidatorMapper(req , res , next){

    const messages = {}
    const result = validationResult(req)
    if(result.errors.length > 0){
        console.log(result.errors);
        result.errors.forEach((err) => {
            
            messages[err.path] = err.msg
        })
        return res.status(400).json({
            status : 400,
            success : false,
            messages
        })
    }
    next()
}

module.exports = {
    expressValidatorMapper
}