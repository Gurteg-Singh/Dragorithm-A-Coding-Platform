const axios = require('axios');


function validateProblemData(data){
    const musthave = ["title","description","difficultyLevel","tags","visibleTestCases","visibleTestCasesForUser","hiddenTestCases","code","solution"];

    const present = musthave.every((k)=> k in data);
    if(!present){
        throw new Error("Some fields are missing");
    }
}

function findLanguageId(lang){
    const l = lang.toLowerCase();
    const map = {
        "java" : 91,
        "c++" : 105,
        "javascript" : 102
    }
    return map[l];
}

async function fetchData(options) {
        try {
            const response = await axios.request(options);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

async function submitBatch(submission){
    const options = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
    params: {
        base64_encoded: 'false'
    },
    headers: {
        'x-rapidapi-key': process.env.JUDGE0_API_KEY,
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
        'Content-Type': 'application/json'
    },
    data: {
        submissions : submission
    }
    };

    return await fetchData(options);
}

async function waiting() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(""); // this value goes to the "await" line
        }, 1000);
    });
}

async function submitToken(tokenString){
    const options = {
    method: 'GET',
    url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
    params: {
        tokens: tokenString,
        base64_encoded: 'false',
        fields: '*'
    },
    headers: {
        'x-rapidapi-key': process.env.JUDGE0_API_KEY,
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
    }
    };

    while(true){
        const result =  await fetchData(options);
        const IsResultObtained =  result.submissions.every((r)=>r.status_id>2);
        if(IsResultObtained)
            return result.submissions;

        await waiting();
    }
}

function getErrorMessage(id){
    const statuses = {
        "4" : "Wrong Answer. Error in test cases or in logic of code solution",
        "5" : "Time Limit Exceeded. Optimize code or decrease input size",
        "6" : "Compilation Error. Solution Code not correct",
        "7" : "Runtime Error (SIGSEGV). Solution Code not correct",
        "8" : "Runtime Error (SIGXFSZ). Solution Code not correct",
        "9" : "Runtime Error (SIGFPE). Solution Code not correct",
        "10" : "Runtime Error (SIGABRT). Solution Code not correct",
        "11" : "Runtime Error (NZEC). Solution Code not correct",
        "12" : "Runtime Error (Other). Solution Code not correct",
        "13" : "Internal Error. Judge0 server problem. Try after some time.",
        "14" : "Exec Format Error. File format not valid for Judge0"
    }

    return statuses[id];
}

module.exports = {validateProblemData,findLanguageId,submitBatch,submitToken,getErrorMessage}