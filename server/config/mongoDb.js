const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const mongoDbConnect = ()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("MONGO DB CONNECTED SUCCESFULLY");
    }).catch((e)=>{
        console.log(e);
    })
}

module.exports = mongoDbConnect;