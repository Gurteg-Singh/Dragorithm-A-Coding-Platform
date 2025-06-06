const express = require("express");
const main = require("./config/database");
require('dotenv').config();
const cookieParser = require('cookie-parser')


const app = express();
app.use(express.json());
app.use(cookieParser());

main()
.then(()=>{
    console.log("connected with mongodb");
    app.listen(process.env.PORT , (req,res)=>{
        console.log("Server listening at PORT : " + process.env.PORT);
    })
})
  