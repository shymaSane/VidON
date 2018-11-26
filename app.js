const express = require ('express');
const exphbs = require('express-handlebars')
const port = 5000;
const mongoose = require('mongoose');
//body parser for the from
const bodyParser = require('body-parser')

//entry file 
const app = express();

//body parser middleware>> without body parser we wnt be able to get request body for form
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//connect mongoose to mongodb(can be remote or local)
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })
.then(() => console.log('connected'))
.catch(err => console.log(err))

//use the global promise library or you ll get deprecation warning mpromise
mongoose.Promise = global.Promise;

//load Ideas model:
require('./models/Ideas')
const Idea = mongoose.model('Ideas')


//add handlebars-express middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Create, Read, Update and Delete (CRUD) operations
//Home
app.get('/', (req, res) => {
    //we can add dynmaic variables to handlebars
    res.render('home')
})

//About Route
app.get('/about', (req, res) => {
    res.render('about')
})

//add ideas
app.get('/ideas/add', (req, res) => {
    res.render('add')
})

//fetch ideas from mogodb and show them
app.get('/ideas', (req,res) => {
    Idea.find({})
    .then(ideas => {
        res.render('ideas',{
            ideas
        })
    })
})

app.get('/ideas/edit/:id', (req, res) => {
    const query = req.params.id;
    Idea.find({_id: query})
    .then(idea => {
        res.render('ideas', {
            idea
        })
    })
    
})

//post form request(note form wont pst if it was empty so we need t add validation):
app.post('/ideas', (req,res) =>{
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
        .then(err => console.log(err))
        res.redirect('/ideas')
    }

})




app.listen(port, () => {
    console.log(`starting on port number ${port}`)
})
