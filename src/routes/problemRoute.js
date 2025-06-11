const express= require("express");
const {userVerification,adminVerification} = require("../middleware/userMiddleware");
const {createProblem,updateProblem,deleteProblem,getProblem,getAllProblems} = require("../controllers/problemController");


const problemRouter = express.Router();
// Admin routes
problemRouter.post("/create",userVerification,adminVerification,createProblem);
problemRouter.patch("/update/:id",userVerification,adminVerification,updateProblem);
problemRouter.delete("/delete/:id",userVerification,adminVerification,deleteProblem);


problemRouter.get("/getProblem/:id",getProblem);
problemRouter.get("/getAllProblems",getAllProblems);
// problemRouter.get("/solvedProblems",solvedProblems);

module.exports = problemRouter;