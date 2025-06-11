const express = require("express");
const{userVerification} = require("../middleware/userMiddleware");
const{submitCode} = require("../controllers/codeSubmissionController");

const submissionRouter = express.Router();

submissionRouter.post("/submit/:id",userVerification,submitCode);

module.exports = submissionRouter;