const registervalidation = require("../utils/userUtils");
const bcrypt = require('bcrypt');
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const redisClient = require("../config/redis");

async function register(req,res){
    try{
        registervalidation(req.body);
        const {firstName,email,password} = req.body;
        const hashed = await bcrypt.hash(password, 10);
        req.body.password = hashed;

        req.body.role = "user";
        const newuser = await User.create(req.body);

        const token = jwt.sign({_id:newuser._id,email : email,role:'user'},process.env.JWT_TOKEN_KEY, { expiresIn: '1h' });
        res.cookie('token',token,{maxAge: 60*60*1000});

        const reply = {
            firstName : newuser.firstName,
            email : newuser.email,
            id : newuser._id
        }

        res.status(201).json({
            user : reply,
            message : "User registered successfully"
        })
    }catch(err){
        res.status(400).send("ERROR" + err.message);
    }
}

async function login(req,res){
    try{
        const {email,password} = req.body;
        if(!email || !password){
            throw new Error("ERROR : Invalid credentials");
        }

        const user = await User.findOne({email : email});
        if(!user){
            throw new Error("ERROR : Invalid credentials");
        }

        const isValid = await bcrypt.compare(password,user.password);
        if(!isValid){
            throw new Error("ERROR : Invalid credentials");
        }

        const token = jwt.sign({_id:user._id,email : email,role:user.role},process.env.JWT_TOKEN_KEY, { expiresIn: '1h' });
        res.cookie('token',token,{maxAge: 60*60*1000});
        
        const reply = {
            firstName : newuser.firstName,
            email : newuser.email,
            id : newuser._id
        }

        res.status(201).json({
            user : reply,
            message : "User registered successfully"
        })

    }catch(err){
        res.status(400).send("ERROR" + err.message);
    }
}

async function logout(req,res){
    try{
        const token = req.cookies.token;
        const user = req.result;
        const payload = req.extractedPayload;
        //ADDING TOKEN TO REDIS BLOCKLIST;

        await redisClient.set(`token:${token}`,"Blocked");
        await redisClient.expireAt(`token:${token}`,payload.exp);

        //SENDING AN INVALID TOKEN THAT EXPIRES IMMEDIATELY

        res.cookie("token",null,{expires : new Date(Date.now(0))});
        res.send("Logged Out Successfully");
    }catch(err){
        res.status(501).send("ERROR" + err.message);
    }
}

async function adminRegister(req,res){
    try{
        registervalidation(req.body);
        const {firstName,email,password} = req.body;
        const hashed = await bcrypt.hash(password, 10);
        req.body.password = hashed;

        req.body.role = "admin";
        const newuser = await User.create(req.body);

        res.status(201).send("New Admin Registered Successfully");
    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
}

async function deleteAccount(req,res){
    try{
        const id = req.result._id;
        await User.findOneAndDelete(id);

        //All submissions of user will be deleted from Submission schema via post hook of mongoose. Check the User Schema.

        res.status(200).send("User deleted Sucessfully");
    }catch(err){
        res.status(500).send("Internal Server Error");
    }
}

async function check(req,res){
    try{
        const reply = {
            firstName : newuser.firstName,
            email : newuser.email,
            id : newuser._id
        }

        res.status(201).json({
            user : reply,
            message : "User registered successfully"
        })
    }catch(err){
        res.status(500).send("ERROR : " + err.message);
    }
}

module.exports = {register,login,logout,adminRegister,deleteAccount,check};