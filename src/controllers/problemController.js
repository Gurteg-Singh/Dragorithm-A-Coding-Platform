const {validateProblemData,findLanguageId,submitBatch,submitToken,getErrorMessage} = require("../utils/problemUtils");
const Problem = require("../models/problem");

async function createProblem(req,res){
    try{
        validateProblemData(req.body);
        const {title,description,difficultyLevel,tags,visibleTestCases,hiddenTestCases,code,solution} = req.body;
        
        for(const sol of solution){
            const langId = findLanguageId(sol.language);
            const src_code = sol.codeSolution;

            const submission = visibleTestCases.map((val)=>{
                return(
                    {
                        language_id : langId,
                        source_code : src_code,
                        stdin: val.input,
                        expected_output : val.output
                    }
                )
            })

            const submitResult = await submitBatch(submission);
            const codeTokens = submitResult.map((val)=>{
                return val.token;
            });

            const tokenString = codeTokens.join(',');
            const result = await submitToken(tokenString);

            for(const ele of result){
                if(ele.status_id !== 3){
                    const message = getErrorMessage(ele.status_id);
                    return res.status(400).send("ERROR : " + message);
                }
            }
        }// Reference code pass all verification steps if code reached this line.
        // now lets save to database 

        const newproblem = await Problem.create({...req.body,problemCreator : req.result._id});
        res.status(201).send("Problem created successfully");
        
    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
}

async function updateProblem(req,res){
    try{
        const id = req.params.id;
        if(!id){
            throw new Error("Id is missing");
        }

        const dsaProblem = await Problem.findById(id);
        if(!dsaProblem){
            throw new Error("DSA problem not found");
        }
        validateProblemData(req.body);
        const {title,description,difficultyLevel,tags,visibleTestCases,hiddenTestCases,code,solution} = req.body;

        for(const sol of solution){
            const langId = findLanguageId(sol.language);
            const src_code = sol.codeSolution;

            const submission = visibleTestCases.map((val)=>{
                return(
                    {
                        language_id : langId,
                        source_code : src_code,
                        stdin: val.input,
                        expected_output : val.output
                    }
                )
            })

            const submitResult = await submitBatch(submission);
            const codeTokens = submitResult.map((val)=>{
                return val.token;
            });

            const tokenString = codeTokens.join(',');
            const result = await submitToken(tokenString);

            for(const ele of result){
                if(ele.status_id !== 3){
                    const message = getErrorMessage(ele.status_id);
                    return res.status(400).send("ERROR : " + message);
                }
            }
        }

        const newProblem = await Problem.findByIdAndUpdate(id , {...req.body}, {runValidators:true, new:true});
   
        res.status(200).send(newProblem);

    }catch(err){
        res.status(501).send("ERROR : " + err.message);
    }
}

async function deleteProblem(req,res){
    try{
        const id = req.params.id;
        if(!id){
            throw new Error("ERROR : Id is missing");
        }

        const deletedproblem = await Problem.findByIdAndDelete(id);
        if(!deletedproblem){
            throw new Error("ERROR : DSA problem is missing");
        }
        res.status(200).send("Successfully Deleted");
    }catch(err){
        res.status(500).send("ERROR : " + err.message);
    }
}

async function getProblem(req,res){
    try{
        const id = req.params.id;
        if(!id){
            throw new Error("ERROR : Id is missing");
        }

        const dsaproblem = await Problem.findById(id).select('_id title description difficultyLevel tags visibleTestCases code');
        if(!dsaproblem){
            throw new Error("ERROR : DSA problem is missing");
        }

        res.status(200).send(dsaproblem);
    }catch(err){
        res.status(404).send("ERROR : " + err.message);
    }
}

async function getAllProblems(req,res){
    try{
        const getProblem = await Problem.find({}).select('_id title difficultyLevel tags');

        if(getProblem.length==0)
            return res.status(404).send("Problem is Missing");


        res.status(200).send(getProblem);
    }
    catch(err){
        res.status(500).send("Error: "+err);
    }
}

module.exports = {createProblem,updateProblem,deleteProblem,getProblem,getAllProblems}