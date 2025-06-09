const express = require("express");
const authRouter = express.Router();

authRouter.post("/register",register);
authRouter.post("/login",login);
authRouter.post("/logout",userVerification,logout);
authRouter.get("/myprofile",myprofile);
