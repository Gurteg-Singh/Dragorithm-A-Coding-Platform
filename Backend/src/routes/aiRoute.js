const express= require("express");
const { userVerification } = require("../middleware/userMiddleware");
const aiRouter = express.Router();
const {aiChat} = require("../controllers/aiController");

aiRouter.post("/chat",userVerification,aiChat);

module.exports = aiRouter;