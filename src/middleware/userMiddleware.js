const jwt = require("jsonwebtoken");
const User = require("../models/user");
const redisClient = require("../config/redis");

async function userVerification(req,res,next){
    try{
        const token = req.cookies.token;
        if(!token){
            throw new Error("ERROR : Token not found");
        }

        const payload = jwt.verify(token,process.env.JWT_TOKEN_KEY);

        const _id = payload.id;
        if(!id){
            throw new Error("ERROR : Id not in database");
        }

        const user = await User.findById(_id);
        if(!user){
            throw new Error("ERROR : User not in database");
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
        res.status(401).send("Error: "+ err.message)
    }
}