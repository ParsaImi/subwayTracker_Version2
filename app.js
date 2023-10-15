const dotenv = require('dotenv')
const Application = require("./server")
dotenv.config({path : './config.env'})
 const {DATABASE} = process.env
  const {DATABASE_PASSWORD} = process.env
  const dbAdress = DATABASE.replace('<PASSWORD>' , DATABASE_PASSWORD)

new Application(7000 , dbAdress)