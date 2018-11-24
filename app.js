const express = require ('express');
const exphbs = require('express-handlebars')
const port = 5000;
const mongoose = require('mongoose');

//entry file 
const app = express();


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


app.listen(port, () => {
    console.log(`starting on port number ${port}`)
})
