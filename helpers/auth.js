module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if(req.isAuthenticated()){
            next()
        } else {
            req.flash('error_msg', 'User Not Logged in!')
            res.redirect('/users/login')
        }
    }
}