const mongoose = require("mongoose");

const editorialSchema = mongoose.Schema({
    problemId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "problem",
        required : true,
        unique : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    publicId : {
        type : String,
        required : true,
        unique : true
    },
    secureUrl : {
        type : String,
        required : true,
        unique : true
    },
    thumbnailUrl : {
        type : String,
        required : true,
        unique : true
    },
    duration :{
        type : Number
    }
},{timestamps : true})

const Editorial = mongoose.model("editorial",editorialSchema);

module.exports = Editorial;