const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();

//bring users schema
require('../models/users')
const User = mongoose.model('users')

router.get('/users/login', (req, res) =>{
    res.render('login')
})

router.get('/users/register', (req, res) =>{
    res.render('register')
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
        console.log(errors)
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    } else {
        res.send('res')
    }
})

module.exports = router