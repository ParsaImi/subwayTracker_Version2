const router = require("express").Router()
const graphRouter = require("./graphRouter")
const roadRouter = require("./roadRouter")
const roadOptionRouter = require("./roadOptionRouter")
const welcomeRouter = require("./welcomeRouter")
const AuthRouter = require("./authRouter")

router.use("/road" , roadRouter)
router.use("/op" , roadOptionRouter)
router.use("/check" , welcomeRouter)
router.use("/graph" , graphRouter)
router.use("/auth" , AuthRouter)

module.exports = router