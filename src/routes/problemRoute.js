const express= require("express");
const {userVerification,adminVerification} = require("../middleware/userMiddleware");



const problemRouter = express.Router();
// Admin routes
problemRouter.post("/create",userVerification,adminVerification,createProblem);
problemRouter.patch("/update/:id",updateProblem);
problemRouter.delete("/delete/:id",deleteProblem);


problemRouter.get("/:id",getProblem);
problemRouter.post("/",getAllProblems);
problemRouter.post("/solved",solvedProblems);