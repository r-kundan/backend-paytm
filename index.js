// require('dotenv').config()
import dotenv from "dotenv"
import connectDB from "./db/index.js"
import app from "./app.js"

dotenv.config({
    path:'./env'
})


connectDB()
.then(()=>{
    app.listen(4000,()=>{
        console.log(`server start at 4000`)
    }) 
}).catch((error)=>{
    console.log(`server not start at 4000 port || mongo db connection fail`,error)
})