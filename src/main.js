const express = require("express");
const main = require("./config/database");
const redisClient = require("./config/redis");
require('dotenv').config();
const cookieParser = require('cookie-parser')


const app = express();
app.use(express.json());
app.use(cookieParser());

async function startServer(){
    await Promise.all([main(),redisClient.connect()]);
    console.log("MongoDB and Redis are connected");

    app.listen(process.env.PORT,()=>{
        console.log("Server running at port : " + process.env.PORT);
    })
}

startServer();