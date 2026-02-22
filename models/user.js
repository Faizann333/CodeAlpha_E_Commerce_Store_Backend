const mongoose = require('mongoose');

const userchema = new mongoose.Schema({
    name: {
        type :String,
        required : true
    },

    email: {
        type :String,
        required : true,
        unique : true,
        lowercase : true
    },
    password: {
        type :String,
        required : true
    },
    role: {
        type :String,
        enum : ['user', 'admin'],
        default : 'user'
    }

},{timestamps : true})


const User = mongoose.models.User || mongoose.model('User', userchema);

module.exports = {User};

