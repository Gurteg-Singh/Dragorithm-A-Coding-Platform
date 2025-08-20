const mongoose = require("mongoose");

const problemSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
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
        enum:["Arrays","Linked List","Graphs","Stacks","Queues","Binary Trees","Binary Search Trees","Dynamic Programming","Strings"]
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
            }
        }
    ],
    visibleTestCasesForUser:[
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
                lowercase:true,
                enum:["java","c++","javascript"]
            },
            codeSolution:{
                type:String,
                required:true
            }
        }
    ],
    problemCreator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required : true
    }
},{timestamps : true});

problemSchema.post('findOneAndDelete', async function (problemInfo) {
    if (problemInfo) {
        await mongoose.model('submission').deleteMany({ problemId: problemInfo._id });
    }
});

const Problem  = mongoose.model("problem",problemSchema);

module.exports = Problem;