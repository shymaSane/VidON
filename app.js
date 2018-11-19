const express = require ('express');
const app = express();
const port = 5000;

//using middleware:

app.use((req, res, next) => {
    req.name = "shyma al sane";
    next();
})

//Index Route
//when ever we add sth new we need to restart the server>>> so you have to install nodemon and it ll restat automatically 
app.get('/', (req, res) => {
    console.log(req.name)
    res.send('Index!!!!')
})

//About Route
app.get('/about', (req, res) => {
    res.send('ABOUT!!!!')
})

app.listen(port, () => {
    console.log(`starting on port number ${port}`)
})
