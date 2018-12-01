const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

//load user model
const User = mongoose.model('users')

module.exports = function (passport){
    //usernameFiled we specify it because we dont use user name
    passport.use(new LocalStrategy({usernameField: 'email'},(email, password, done) => {

    }))
}