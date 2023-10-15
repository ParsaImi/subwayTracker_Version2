// const Controller = require("./controller")
const Controller = require("./controller")





module.exports = class TestController extends Controller{
    testmeth(req , res , next){
        console.log(this.common());
        res.json({yo : "test"})
    }
}
