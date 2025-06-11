const Submission = require("../models/codeSubmissions");
const Problem = require("../models/problem");
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

        console.log(newSubmission);

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
                errorMessage = ele.stderr;
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


        res.send(newSubmission);
    }catch(err){
        res.send("Error : " + err.message);
    }
}

module.exports = {submitCode}
const obj = {
    source_code: '#include <iostream>\n' +
      'using namespace std;\n' +
      '\n' +
      'bool isPalindrome(string s) {\n' +
      '    int i = 0, j = s.length() - 1;\n' +
      '    while (i < j) {\n' +
      '        if (s[i] != s[j]) return false;\n' +
      '        i++; j--;\n' +
      '    }\n' +
      '    return true;\n' +
      '}\n' +
      '\n' +
      'int main() {\n' +
      '    string s;\n' +
      '    cin >> s;\n' +
      '    cout << boolalpha << isPalindrome(s);\n' +
      '    return 0;\n' +
      '}',
    language_id: 105,
    stdin: '"madam"',
    expected_output: 'true',
    stdout: 'true',
    status_id: 3,
    created_at: '2025-06-11T22:57:59.873Z',
    finished_at: '2025-06-11T22:58:00.988Z',
    time: '0.002',
    memory: 1688,
    stderr: null,
    token: '9ef4a567-d94a-42d8-890f-a7bf51c1c950',
    number_of_runs: 1,
}