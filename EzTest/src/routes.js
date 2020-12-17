const express = require('express');
const mongoose = require('mongoose');

const loginRouter = require('./login/routes');
const quizRouter = require('./quiz/routes');

const isAuthenticated = require('./login/controller/passport_strategies').isAuthenticated;
const quizController = require("./quiz/controller");
const userController = require('./user/controller');
const router = express.Router();
const UserByID = require('./user/model').GetByID;
const QuizByID = require('./quiz/model').GetByID;

router.use('/login', loginRouter);
// router.use('/test', testRoutes);
router.use('/quiz', quizRouter);


router.get('/search', async (req, res) => {
    console.log(req.query);

    let result;
    if (req.query.key.length === 0) {
        results = await quizController.GetPopularQuizzes();
    }
    else {
        results = await quizController.Search(req.query.key);
    }

    console.log("before ejs")
    console.log(results);
    const key = req.query.key;

    res.render('search', { key, results });
})

router.get('/dashboard', async (req, res) => {
    res.locals.currentScene = "dashboard";

    const recent = await quizController.GetRecentQuizzes();
    const popular = await quizController.GetPopularQuizzes();
    const topActive = await userController.GetTopActive();

    res.render('dashboard', { recent, popular, topActive });
});

router.get('/logout', isAuthenticated, (req, res) => {
    req.logout();
    req.flash("success", "Logged out successfully.");
    res.redirect('/dashboard');
});



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
    console.log(ans_list);
    var id = req.body.quiz_id;
    console.log(id);
    console.log(typeof (id));
    quizController.quiz_result(id, ans_list, res);
});

router.get('/quiz_results/:userid', async (req, res) => {
    var id = req.params.userid;
    var per = await UserByID(id);
    var quiz_take = per.test_taking;
    var quiz_title = [];
    for (var i = 0; i < quiz_take.length; i++) {
        var aquiz = await QuizByID(mongoose.Types.ObjectId(quiz_take[i].quiz));
        quiz_title.push(aquiz.title);
    }
    res.render('quiz_results', {
        quiz_take: quiz_take,
        quiz_title: quiz_title
    });
});

router.get('/profile', async (req, res) => {
    await userController.accountSetting(req, res);

});


router.post('/change-name', async (req, res) => {

    await userController.changeName(req, res);

});
router.post('/change-password', async (req, res) => {

    await userController.changePassword(req, res);

});

module.exports = router;
