const express = require ('express');
const app = express();
const exphbs = require('express-handlebars')
const port = 5000;
const mongoose = require('mongoose');

//connect mongoose to mongodb
const mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB)

//use the global promise library
mongoose.Promise = global.Promise;

//get default connection
const db = mongoose.connection

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//making schema
const Schema = mongoose.Schema
const ideas = new Schema ({
    title: String,
    idea: String
})

//compile model for schema
const IdeasModel = mongoose.model('IdeasModel', ideas)

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
