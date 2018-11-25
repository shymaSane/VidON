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

//post form request(note form wont pst if it was empty so we need t add validation):
app.post('/ideas', (req,res) =>{
    let errors = []
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
            title: req.body.title,
            detailes: req.body.detailes
        })
    } else {
        console.log(req.body)
        res.redirect('/ideas')
    }

})

app.listen(port, () => {
    console.log(`starting on port number ${port}`)
})
