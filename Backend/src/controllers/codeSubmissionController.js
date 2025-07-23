const Submission = require("../models/codeSubmissions");
const Problem = require("../models/problem");
const User = require("../models/user");
const { findLanguageId,submitBatch,submitToken } = require("../utils/problemUtils");

async function submitCode(req,res){
    try{
        const problemId = req.params.id;
        const userId = req.result._id;
        const {language,code} = req.body;

        if(!problemId || !userId || !language || !code){
            throw new Error("ERROR : Some required fields are missing");
        }

        const dsaProblem = await Problem.findById(problemId);
        if(!dsaProblem){
            throw new Error("ERROR : DSA Problem doesn't exist");
        }

        const newSubmission = await Submission.create({
            code,
            language,
            userId,
            problemId,
            status : "Pending",
            testCasesTotal : dsaProblem.hiddenTestCases.length,
        })

        const langId = findLanguageId(language);

        const submission = dsaProblem.hiddenTestCases.map((c)=>{
            return(
                {
                    source_code:code,
                    language_id: langId,
                    stdin: c.input,
                    expected_output: c.output
                }
            )
        });

        const submitResult = await submitBatch(submission);
        const codeTokens = submitResult.map((val)=>{
            return val.token;
        });

        const tokenString = codeTokens.join(',');
        const result = await submitToken(tokenString);
        

        let status = "Accepted";
        let testCasesPassed = 0;
        let runtime = 0;
        let memory = 0;
        let errorMessage=null;

        for(const ele of result){
            if(ele.status_id === 3){
                testCasesPassed++;
                const time = Number(ele.time);
                runtime += time;
                memory = Math.max(memory,ele.memory);
            }else{
                status = "Wrong answer";
                errorMessage = ele.compile_output;
                break;
            }
        }
        newSubmission.status = status;
        newSubmission.errorMessage = errorMessage;
        newSubmission.runtime = runtime;
        newSubmission.memory = memory;
        newSubmission.testCasesPassed = testCasesPassed;


        //Upadting and Saving the Submission
        newSubmission.save();

        if(status === "Accepted"){
            if(!req.result.problemSolved.includes(problemId)){
                req.result.problemSolved.push(problemId);
                await req.result.save();
            }
        }
        console.log("i m here");
        console.log(newSubmission);
        res.status(201).json(newSubmission);
        
    }catch(err){
        res.send("Error : " + err.message);
    }
}

async function runCode(req,res){
    try{
        const problemId = req.params.id;
        const userId = req.result._id;
        const {language,code} = req.body;

        if(!problemId || !userId || !language || !code){
            throw new Error("ERROR : Some required fields are missing");
        }

        const dsaProblem = await Problem.findById(problemId);
        if(!dsaProblem){
            throw new Error("ERROR : DSA Problem doesn't exist");
        }

        const langId = findLanguageId(language);

        const submission = dsaProblem.visibleTestCases.map((c)=>{
            return(
                {
                    source_code:code,
                    language_id: langId,
                    stdin: c.input,
                    expected_output: c.output
                }
            )
        });

        const submitResult = await submitBatch(submission);
        const codeTokens = submitResult.map((val)=>{
            return val.token;
        });
        
        const tokenString = codeTokens.join(',');
        const result = await submitToken(tokenString);


        res.status(200).send(result);
        
    }catch(err){
        res.status(500).send("Error : " + err.message);
    }
}

module.exports = {submitCode,runCode}
