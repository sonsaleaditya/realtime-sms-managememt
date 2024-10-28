// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
        
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);
