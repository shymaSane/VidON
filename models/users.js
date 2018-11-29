const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    user_name:{
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

mongoose.model('users', UserSchema)