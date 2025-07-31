const express= require("express");
const { userVerification, adminVerification } = require("../middleware/userMiddleware");
const editorialRouter = express.Router();
const {getCloudUrl, saveVideo} = require("../controllers/editorialController");

editorialRouter.get("/upload/:id",userVerification,adminVerification,getCloudUrl);
editorialRouter.post("/save",userVerification,adminVerification,saveVideo);

module.exports = editorialRouter;