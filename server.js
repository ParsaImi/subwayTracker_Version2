const morgan = require("morgan")
const mongoose = require('mongoose')
const redisDB = require("redis")
const errorHandler = require("./app/http/controller/errorController")
const roadController = require("./app/http/controller/roadController")
const path = require("path")
const AllRoutes = require("./app/routes/router")
const errorMaker = require("http-errors")
const bodyParser = require("body-parser")
const cors = require("cors")
  



module.exports = class Application{
  #express = require("express")
  #app = this.#express()
  constructor(PORT , db_url){
    this.configApplication()
    this.configDatabase(db_url)
    this.createRoutes()
    this.createServer(PORT)
    // this.errorHandler()
  }
  configApplication(){
    this.#app.use(this.#express.json())
    this.#app.use(this.#express.urlencoded({extended : true}))
    this.#app.use(bodyParser.urlencoded({ extended: false }))
    this.#app.use(bodyParser.json())
    this.#app.use(cors())
    this.#app.use(morgan("dev"))
    this.#app.use('/', this.#express.static(path.join(__dirname, 'public')))
    // this.#app.use(this.#express.static(path.join(__dirname, 'public')))
  }

  createServer(PORT){
    const server = this.#app.listen(PORT , () => {
      console.log('server waiting for request');
      
  })
  }

  configDatabase(db_url){
    mongoose.connect(db_url).then(() => {
      console.log('app connected to the DataBase');
   })
   process.on("SIGINT" , async() => {
     await mongoose.connection.close()
     process.exit(0)
   })
  }

  // initRedis(){
  //     const redisClient = redisDB.createClient({url : 'redis://192.168.1.10:6379'})
  //     redisClient.connect()
  // //     redisClient.on('connect' , () => {
  // //     console.log("connected");
  // // })

  //   }

  errorHandler(){

    this.#app.use((req , res , next) => {
      next(errorMaker.NotFound("آدرس مورد نظر یافت نشد"))
    })
   
    this.#app.use(errorHandler)
  }

  createRoutes(){
    // this.#app.get("/" , (req , res , next) => {
    //   res.json({
    //     message : "welcome to proj",
    //     status : 200
    //   })
    // })
    this.#app.use(AllRoutes)
  }
}