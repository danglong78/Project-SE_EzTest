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
    .post(passport.authenticate('local', {
        successRedirect: '../dashboard',
        failureRedirect: '/login',
        failureFlash: true
    }));

loginRouter.route('/auth/google')
    .get(passport.authenticate('google', { scope: ['profile', 'email'] }));

loginRouter.route('/auth/google/callback')
    .get(passport.authenticate('google', { failureRedirect: '/login' }),
        function (req, res) {
            res.redirect('../../../dashboard');
        });

loginRouter.route('/auth/facebook')
    .get(passport.authenticate('facebook', { scope: ['email'] }));

loginRouter.route('/auth/facebook/callback')
    .get(passport.authenticate('facebook', { failureRedirect: '/login' }),
        function (req, res) {
            res.redirect('../../../dashboard');
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