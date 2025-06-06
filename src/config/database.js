const mongoose  = require("mongoose");
require('dotenv').config();

async function main(){
    await mongoose.connect(process.env.MONGODB_CONNECTION_URL);
}

module.exports = main;