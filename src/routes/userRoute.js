const express = require("express");
const {userVerification,adminVerification} = require("../middleware/userMiddleware");
const {register,login,logout,adminRegister} = require("../controllers/userController");

const authRouter = express.Router();

authRouter.post("/register",register);
authRouter.post("/login",login);
authRouter.post("/logout",userVerification,logout);
authRouter.post("/admin/register",userVerification,adminVerification,adminRegister);
// authRouter.get("/myprofile",myprofile);

module.exports = authRouter;
