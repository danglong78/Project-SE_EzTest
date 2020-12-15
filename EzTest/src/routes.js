const express = require('express');

const loginRouter = require('./login/routes');
const quizRouter = require('./quiz/routes');

const isAuthenticated = require('./login/controller/passport_strategies').isAuthenticated;
const quizController = require("./quiz/controller");
const router = express.Router();

router.use('/login', loginRouter);
// router.use('/user', userRoutes);
// router.use('/test', testRoutes);
router.use('/quiz', quizRouter);
router.get('/dashboard', (req, res) => {


    res.render('dashboard', {});
});

router.get('/logout', isAuthenticated, (req, res) => {
    req.logout();
    req.flash("success", "Logged out successfully.");
    res.redirect('/dashboard');
});

// router.get('/quizzes', (req, res) => {
//     res.render('quizzes');
// });
//
// router.get('/quiz-edit', (req, res) => {
//     res.render('quiz-edit');
// });

router.get('/take_quiz/:quizid', (req, res) => {
    var id = req.params.quizid;
    quizController.take_quiz(id, res);
});

router.post('/quiz_result', (req, res) => {
    var ans_string = req.body.ans_list;
    var temp = ans_string.split(",");
    var ans_list = [];
    for (var i = 0; i < temp.length; i++) {
        ans_list.push(parseInt(temp[i]));
    }
    var id = req.body.quiz_id;
    quizController.quiz_result(id, ans_list, res);
});



module.exports = router;
