const express = require('express');

const loginRouter = require('./login/routes');
const isAuthenticated = require('./login/controller/passport_strategies').isAuthenticated;
const Quiz = require("./quiz/controller");
const router = express.Router();

router.use('/login', loginRouter);
// router.use('/user', userRoutes);
// router.use('/test', testRoutes);

router.get('/dashboard', (req, res) => {


    res.render('dashboard');
});

router.get('/logout', isAuthenticated, (req, res) => {
    req.logout();
    req.flash("success", "Logged out successfully.");
    res.redirect('/dashboard');
});

router.get('/quizzes', (req, res) => {
    res.render('quizzes');
});

router.get('/quiz-edit', (req, res) => {
    res.render('quiz-edit');
});

router.get('/take_quiz/:quizid', (req, res) => {
    var id = req.params.quizid;
    Quiz.take_quiz(id, res);
});

module.exports = router;
