const axios = require('axios');


function validateProblemData(data){
    const musthave = ["title","description","difficultyLevel","tags","visibleTestCases","hiddenTestCases","code","solution","problemCreator"];

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

    return map.l;
}

async function submitBatch(submissions){
    const options = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
    params: {
        base64_encoded: 'true'
    },
    headers: {
        'x-rapidapi-key': process.env.JUDGE0_API_KEY,
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
        'Content-Type': 'application/json'
    },
    data: {
        submissions
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

module.exports = {validateProblemData,findLanguageId}