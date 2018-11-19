const express = require ('express');
const app = express();
const port = 5000;

//Index Route
//when ever we add sth new we need to restart the server
app.get('/', (req, res) => {
    res.send('Index!!!!')
    
})

//About Route
app.get('/about', (req, res) => {
    res.send('ABOUT!!!!')
})

app.listen(port, () => {
    console.log(`starting on port number ${port}`)
})
