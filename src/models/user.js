const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type : String,
        required : true,
        minLength : 3,
        maxLenght : 15,
        trim : true
    },
    lastName:{
        type : String,
        minLength : 3,
        maxLenght : 15,
        trim : true
    },
    email:{
        type : String,
        unique : true,
        required : true,
        trim : true,
        immutable: true,
        lowercase:true
    },
    password:{
        type : String,
        required : true,
        minLenght : 8
    },
    role:{
        type:String,
        enum:['user','admin'],
        default: 'user'
    },
    problemsolved :{
        type : [String] 
    }
},{timestamps:true});

const User = mongoose.model("User",userSchema);

module.exports = User;