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

module.exports = {createProblem}