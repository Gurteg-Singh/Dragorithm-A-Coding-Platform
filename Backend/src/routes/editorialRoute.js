const express= require("express");
const { userVerification, adminVerification } = require("../middleware/userMiddleware");
const editorialRouter = express.Router();
const {getCloudUrl, saveVideo ,getEditorial,deleteEditorial} = require("../controllers/editorialController");

editorialRouter.get("/upload/:id",userVerification,adminVerification,getCloudUrl);
editorialRouter.post("/save",userVerification,adminVerification,saveVideo);
editorialRouter.get("/getEditorial/:id",userVerification,adminVerification,getEditorial);
editorialRouter.delete("/deleteEditorial/:id",userVerification,adminVerification,deleteEditorial);

module.exports = editorialRouter;