const express = require('express');
const register = require('./controller/register');
const authenticate = require('./controller/authenticate');
const passport = require('passport');


const loginRouter = express.Router();

loginRouter.route('/')
    .get((req, res) => {
        if (req.isAuthenticated()) {
            res.redirect("../../../dashboard");
        }
        else
            res.render('login/login');
    })
    .post(passport.authenticate('local', { failureRedirect: "/login", failureFlash: true }), (req, res) => {
        if (req.user) {
            const redirectUrl = "http://localhost:3000" + (req.session.redirectUrl || "/dashboard");
            console.log("after authenticate");
            console.log(redirectUrl);
            res.redirect(redirectUrl);
        }
    });

loginRouter.route('/auth/google')
    .get(passport.authenticate('google', { scope: ['profile', 'email'] }));

loginRouter.route('/auth/google/callback')
    .get(passport.authenticate('google', { failureRedirect: "/login", failureFlash: true }), (req, res) => {
        if (req.user) {
            const redirectUrl = "http://localhost:3000" + (req.session.redirectUrl || "/dashboard");
            console.log("after authenticate");
            console.log(redirectUrl);
            res.redirect(redirectUrl);
        }
    });

loginRouter.route('/auth/facebook')
    .get(passport.authenticate('facebook', { scope: ['email'] }));

loginRouter.route('/auth/facebook/callback')
    .get(passport.authenticate('facebook', { failureRedirect: "/login", failureFlash: true }), (req, res) => {
        if (req.user) {
            const redirectUrl = "http://localhost:3000" + (req.session.redirectUrl || "/dashboard");
            console.log("after authenticate");
            console.log(redirectUrl);
            res.redirect(redirectUrl);
        }
    });


loginRouter.route('/register')
    .get((req, res) => {
        if (req.isAuthenticated()) {
            res.redirect("../../../dashboard");
        }
        else
            res.render('login/register');
    })
    .post(async (req, res) => {
        await register(req, res);
    });

module.exports = loginRouter;