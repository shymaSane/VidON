const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//import helpers using deconstruction:
const {ensureAuthenticated} = require('../helpers/auth')

//load Ideas model:
require('../models/Ideas')
const Idea = mongoose.model('Ideas')

//fetch ideas from mogodb and show them
router.get('/ideas', ensureAuthenticated, (req,res) => {
    Idea.find({})
    .then(ideas => {
        res.render('ideas',{
            ideas
        })
    })
})

//add ideas
router.get('/ideas/add_idea', ensureAuthenticated, (req, res) => {
    res.render('add')
})

//grab idea to edit with certain id
router.get('/ideas/edit/:id', ensureAuthenticated, (req, res) => {
    const query = req.params.id;
    //find returns array with the results in it
    Idea.findOne({_id: query})
    .then(idea => {
        res.render('edit', {
            idea
        })
    })
    
})

//post form request(note form wont pst if it was empty so we need t add validation):
router.post('/ideas', ensureAuthenticated, (req,res) =>{
    let errors = []
    let title = req.body.title
    let detailes = req.body.detailes
    if(!req.body.title){
        errors.push('Title is missing! please enter your title.')
    }
    if(!req.body.detailes){
        errors.push('idea is missing! please enter your idea.')
    }
    //handle the form
    if(errors.length > 0){
        res.render('add', {
            //note we get name of fieldes from name attribute in add.handlebras
            errors,
            title,
            detailes
        })
    } else {
        //create instance from model Idea
        const newIdea = new Idea({
           title,
           detailes 
        })
        newIdea.save()
        .then(() => {
            req.flash('success_msg', 'Video Idea has been added successfuly')
            res.redirect('/ideas')
        })
        
    }

})

//form put request 

router.put('/ideas/:id', ensureAuthenticated, (req, res) => {
    Idea.update({_id: req.params.id}, req.body)
    .then(() => {
        req.flash('success_msg', 'Video Idea has been updated successfuly')
        res.redirect('/ideas') 
    })
})

//delete idea 
router.delete('/ideas/:id', ensureAuthenticated, (req, res) => {
    Idea.remove({_id: req.params.id})
    .then( () => {
        req.flash('success_msg', 'Video Idea has been deleted successfuly')
        res.redirect('/ideas')
    })
})

module.exports = router