const {validateProblemData,findLanguageId} = require("../utils/problemUtils");

async function createProblem(req,res){
    try{
        validateProblemData(req.body);
        const {title,description,difficultyLevel,tags,visibleTestCases,hiddenTestCases,code,solution,problemCreator} = req.body;

        for(const sol of solution){
            const langId = findLanguageId(sol.language);
            const src_code = sol.codeSolution;

            const submissions = visibleTestCases.map((val)=>{
                return(
                    {
                        language_id : langId,
                        source_code : src_code,
                        stdin: val.input,
                        expected_output : val.output
                    }
                )
            })

            const submit = await submitBatch(submissions);
        }
    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
}