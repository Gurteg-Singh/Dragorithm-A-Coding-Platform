const express= require("express");
const {userVerification,adminVerification} = require("../middleware/userMiddleware");
const {createProblem} = require("../controllers/problemController");


const problemRouter = express.Router();
// Admin routes
problemRouter.post("/create",userVerification,adminVerification,createProblem);
// problemRouter.patch("/update/:id",updateProblem);
// problemRouter.delete("/delete/:id",deleteProblem);


// problemRouter.get("/:id",getProblem);
// problemRouter.get("/",getAllProblems);
// problemRouter.get("/solved",solvedProblems);

module.exports = problemRouter;