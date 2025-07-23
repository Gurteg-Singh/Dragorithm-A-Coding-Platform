const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'problem',
    required: true
  },
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true,
    enum: ['javascript', 'c++', 'java'] 
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Wrong answer'],
    default: 'Pending'
  },
  runtime: {
    type: Number,  // milliseconds
    default: 0
  },
  memory: {
    type: Number,  // kB
    default: 0
  },
  errorMessage: {
    type: String,
    default: ''
  },
  testCasesPassed: {
    type: Number,
    default: 0
  },
  testCasesTotal: {  // Recommended addition
    type: Number,
    default: 0
  },
  failedInput:{
    type:String
  },
  failedOutput:{
    type:String
  },
  failedExpectedOutput:{
    type:String
  },
}, { 
  timestamps: true
});

submissionSchema.index({userId : 1,problemId :1});
const Submission = mongoose.model('submission',submissionSchema);

module.exports = Submission;