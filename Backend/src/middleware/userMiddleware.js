const jwt = require("jsonwebtoken");
const User = require("../models/user");
const redisClient = require("../config/redis");

async function userVerification(req,res,next){
    try{
        const token = req.cookies.token;
        if(!token){
            throw new Error("Token not found");
        }

        const payload = jwt.verify(token,process.env.JWT_TOKEN_KEY);

        const _id = payload._id;
        if(!_id){
            throw new Error("Id not in database");
        }

        const user = await User.findById(_id);
        if(!user){
            throw new Error("User not in database");
        }

        //Checking Token in Redis Blocklist or not 
        const isBlocked = await redisClient.exists(`token:${token}`);
        if(isBlocked){
            throw new Error("ERROR : Token is Blocked");
        }

        req.result = user;
        req.extractedPayload = payload;
        next();
    }catch(err){
        res.status(401).send("Error : "+ err.message)
    }
}

async function adminVerification(req,res,next){
    try{
        const payload = req.extractedPayload;
        const role = payload.role;

        if(role!=="admin"){
            throw new Error("ERROR : You are not an admin");
        }

        next();
    }catch(err){
        res.send("ERROR : " + err.message);
    }
}

module.exports = {userVerification,adminVerification};