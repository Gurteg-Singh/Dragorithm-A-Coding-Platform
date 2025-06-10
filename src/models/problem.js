const mongoose = require("mongoose");

const problemSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    difficultyLevel:{
        type:String,
        required:true,
        enum:["easy","medium","hard"]
    },
    tags:[
        {
        type:String,
        required:true,
        enum:["Arrays","Linked List","Graphs","Stacks","Queues","Binary Trees","Binary Search Trees","Dynamic Programming"]
        }
    ],
    visibleTestCases:[
        {
            input:{
                type:String,
                required:true
            },
            output:{
                type:String,
                required:true
            },
            explanation:{
                type:String,
                required:true
            }
        }
    ],
    hiddenTestCases:[
        {
            input:{
                type:String,
                required:true
            },
            output:{
                type:String,
                required:true
            }
        }
    ],
    code:[
        {
            language:{
                type:String,
                required:true,
                enum:["Java","C++","Javascript"]
            },
            boilerPlateCode:{
                type:String,
                required:true
            }
        }
    ],
    solution:[
        {
            language:{
                type:String,
                required:true,
                enum:["Java","C++","Javascript"]
            },
            codeSolution:{
                type:String,
                required:true
            }
        }
    ],
    problemCreator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true
    }
},{timestamps : true});

const Problem  = mongoose.model("problme",problemSchema);

module.exports = Problem;