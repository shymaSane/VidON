const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

//load user model
const User = mongoose.model('users')

module.exports = function (passport){
    //usernameFiled we specify it because we dont use user name
    passport.use(new LocalStrategy({usernameField: 'email'},(email, password, done) => {
        
        User.findOne({email})
        .then(user => {
            if(!user){
                return done(null, false, {message: "No User Found"})
            }
            //if there is a user, match passwords:
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch){
                    return done(null, user)
                } else{
                    return done(null, false, {message: 'Password Incorrect'})
                }
            })
        })
    }))
    
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
}