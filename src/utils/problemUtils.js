const axios = require('axios');


function validateProblemData(data){
    const musthave = ["title","description","difficultyLevel","tags","visibleTestCases","hiddenTestCases","code","solution"];

    const present = musthave.every((k)=> k in data);
    if(!present){
        throw new Error("ERROR : Some fields are missing");
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

    async function fetchData() {
        try {
            const response = await axios.request(options);
            return response.data;
        } catch (error) {
            return error;
        }
    }

    return await fetchData();
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

    async function fetchData() {
        try {
            const response = await axios.request(options);
            return response.data;
        } catch (error) {
            return error;
        }
    }

    while(true){
        const result =  await fetchData();
        const IsResultObtained =  result.submissions.every((r)=>r.status_id>2);
        if(IsResultObtained)
            return result.submissions;

        await waiting();
    }
}

function getErrorMessage(id){
    const statuses = {
        "4" : "Wrong Answer",
        "5" : "Time Limit Exceeded",
        "6" : "Compilation Error",
        "7" : "Runtime Error (SIGSEGV)",
        "8" : "Runtime Error (SIGXFSZ)",
        "9" : "Runtime Error (SIGFPE)",
        "10" : "Runtime Error (SIGABRT)",
        "11" : "Runtime Error (NZEC)",
        "12" : "Runtime Error (Other)",
        "13" : "Internal Error",
        "14" : "Exec Format Error"
    }

    return statuses[id];
}

module.exports = {validateProblemData,findLanguageId,submitBatch,submitToken,getErrorMessage}