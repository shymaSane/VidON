const express = require ('express');
const path = require('path')
const exphbs = require('express-handlebars');
const port = 5000;
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const flash = require('connect-flash');
//body parser for the from
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');


//entry file 
const app = express();

//load routes:
const ideas = require('./routes/ideas')
const users = require('./routes/users')

require('./config/passport')(passport)
//middleware for flash messaging 
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
  }));

app.use(flash())

//global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('erorr');
    next()
})

// override with POST having ?_method=PUT
app.use(methodOverride('_method'))

//body parser middleware>> without body parser we wnt be able to get request body for form
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//connect mongoose to mongodb(can be remote or local)
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })
.then(() => console.log('connected'))
.catch(err => console.log(err))

//use the global promise library or you ll get deprecation warning mpromise
mongoose.Promise = global.Promise;

//to use static files:
app.use(express.static(path.join(__dirname + '/public')));

//add handlebars-express middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Passport init
app.use(passport.initialize());
app.use(passport.session());

//Create, Read, Update and Delete (CRUD) operations

//Home
app.get('/', (req, res) => {
    //we can add dynmaic variables to handlebars
    //this ll print the session id when ever we visited our home page
    console.log(req.sessionID)
    res.render('home')
})

//About Route
app.get('/about', (req, res) => {
    //this ll print the same number for home page session
    console.log(req.sessionID)
    res.render('about')
})

app.use('/', ideas)
app.use('/', users)



app.listen(port, () => {
    console.log(`starting on port number ${port}`)
})
