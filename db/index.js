// const mongoose = require('mongoose')
import mongoose from "mongoose"


const connectDB = async () => {
    try {
        const connections =
            await mongoose.connect("mongodb+srv://paytm:tvTxHV4lL4jbdtc6@clustermegabackend.yrp5px0.mongodb.net", {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                dbName: "paytmback"
            })
        console.log(`\n Mongo DB connect !! DB Host:  ${connections.connection.host}`)
    } catch (error) {
        console.log("mongoose connection error", error)
        process.exit(1)
    }
}

export default connectDB

