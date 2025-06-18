const express = require("express");
const{userVerification} = require("../middleware/userMiddleware");
const{submitCode,runCode} = require("../controllers/codeSubmissionController");

const submissionRouter = express.Router();

submissionRouter.post("/submit/:id",userVerification,submitCode);
submissionRouter.post("/run/:id",userVerification,runCode);

module.exports = submissionRouter;