const express = require("express");
const main = require("./config/database");
const redisClient = require("./config/redis");
require('dotenv').config();
const cookieParser = require('cookie-parser');
const authRouter = require("./routes/userRoute");
const problemRouter = require("./routes/problemRoute");
const submissionRouter = require("./routes/codeSubmissionRoute");


const app = express();
app.use(express.json());
app.use(cookieParser());


app.use("/user",authRouter);
app.use("/problem",problemRouter);
app.use("/submission",submissionRouter);

async function startServer(){
    await Promise.all([main(),redisClient.connect()]);
    console.log("MongoDB and Redis are connected");

    app.listen(process.env.PORT,()=>{
        console.log("Server running at port : " + process.env.PORT);
    })
}

startServer();