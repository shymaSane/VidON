const express = require('express');
const router = express.Router()

router.get('/users/login', (req, res) =>{
    res.render('login')
})

module.exports = router