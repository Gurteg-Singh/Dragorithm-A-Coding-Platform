const express= require("express");
const { userVerification, adminVerification } = require("../middleware/userMiddleware");
const editorialRouter = express.Router();
const {getCloudUrl} = require("../controllers/editorialController");

editorialRouter.get("/upload/:id",userVerification,adminVerification,getCloudUrl);