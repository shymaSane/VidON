const express = require ('express');
const app = express();
const exphbs = require('express-handlebars')
const port = 5000;


//add handlebars-express middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

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
