path = require('path');
module.exports = function (app, passport) {
    //========================== Login/ Signup Pages ==========================

    app.get('/', function (req, res) {
        res.render("login-page.ejs")
    });

    app.get('/signup-page.html', function (req, res) {
        res.render("signup-page.ejs")
    });

    app.get('/login-page.html', function (req, res) {
        res.render("login-page.ejs")
    });


    app.get('/create-event', function(req, res){
        res.send('create-event.ejs');
    });




    //========================== Authentication ==========================

    //logout
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

// process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/loginHome.html', // redirect to the secure profile section
        failureRedirect: '/signup-page.html', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

// process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/loginHome.html', // redirect to the secure profile section
        failureRedirect: '/login-page.html', // redirect back to the login page if there is an error
        failureFlash: true // allow flash messages
    }));

    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

// route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/');
    }


    //========================== RESOURCES ==========================


};