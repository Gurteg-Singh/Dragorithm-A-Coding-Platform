const validator = require("validator");

const registervalidation = (data)=>{
    const musthave = ["firstName","email","password"];

    const present = musthave.every((k)=> k in data);

    if(!present){
        throw new Error("ERROR : Some fields are missing");
    }

    if(!validator.isEmail(data.email)){
        throw new Error("ERROR : Email is not valid");
    }

    if(!validator.isStrongPassword(data.password)){
        throw new Error("ERROR : Please make your password strong");
    }
}

module.exports = registervalidation;