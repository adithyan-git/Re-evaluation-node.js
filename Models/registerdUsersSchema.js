const mongoose = require('mongoose');

const registerdUserSchema = new mongoose.Schema({
    fullname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        default:'user'
    }
})

const userSchema = mongoose.model('userRegistration',registerdUserSchema);
module.exports = userSchema;