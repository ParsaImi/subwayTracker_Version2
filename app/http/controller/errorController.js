    const errorMaker = require("http-errors")
    exports.errorController = (error , req , res , next) => {
    error.statusCode = error.status || errorMaker.InternalServerError().status
    error.message = error.message || errorMaker.InternalServerError().message

    return res.status(error.statusCode).json({
        errors : {
            statusCode,
            message
        }
    })
}

