const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');

//bring users schema
require('../models/users')
const User = mongoose.model('users')

router.get('/users/login', (req, res) =>{
    res.render('login')
})

router.get('/users/register', (req, res) =>{
    res.render('register')
})

//login post method
router.post('/users/login', (req, res, next) => {
    passport.authenticate('local',{
        successRedirect: '/ideas',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
})

router.post('/users/register', (req, res) => {
  
    let errors = [];
    let name = req.body.name;
    let email = req.body.email;
    let password= req.body.password;
    let password2 = req.body.password2;

    if(!req.body.name){
        errors.push('user name is missing, please enter your user name')
    }
    if(!email){
        errors.push('email is missing, please enter your email')
    }
    if(!password){
        errors.push('password is missing, please enter your password')
    }
    if(!password2){
        errors.push('password is missing, please confrim your password')
    }

    if(password !== password2 || password.length < 4){
        errors.push('passwords are not matching or password less than 4 charachters')
    }

    if(errors.length > 0){
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    } else {
        User.findOne({email: email})
        .then((user) => {
            if(user){
                req.flash('error_msg', 'This email already registered')
                res.redirect('/users/register')
            } else {
                //make new instance from User Scheam
                const newUser = new User({
                    name,
                    email,
                    password  
                })
                //crypt the password before saving in DB
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, function(err, hash) {
                        // Store hash in your password DB.
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                        .then((user) => {
                            res.redirect('/users/login')
                        })
                        .catch((err) => console.log(err))
                    });
                });
            }

        })
        .catch(err => console.log(err))
       
    }
})

module.exports = router