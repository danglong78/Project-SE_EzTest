const express = require('express');
const quizModel = require('./model').model;
const quizRouter = express.Router();
const quizController = require('./controller');
const isAuthenticated = require('../login/controller/passport_strategies').isAuthenticated;

quizRouter.get('/', async function (req, res) {
    const x = req.user['_id'];
    const list = await quizModel.find({ uploader: x });
    res.render('quiz/quiz-manager', { quizzes: list });
});
quizRouter.get('/add', isAuthenticated, function (req, res) {
    res.render('quiz/add');
});
quizRouter.post('/add', isAuthenticated, async function (req, res) {
    // let temp = JSON.parse((req.body));
    let temp = req.body;

    let quiz = new quizModel({
        uploader: req.user._id,
        title: temp.title,
        count_taker: 0,
        rate: [],
        checked: false,
        description: "",
        questions: temp.questionList,
        right_ans_count: 0,
        date_created: new Date(),
        wireframe: temp.timeframe,
    })
    await quiz.save();
    console.log("Success");
    res.redirect("/quiz")

});
quizRouter.post('/delete', isAuthenticated, async function (req, res) {
    let id = req.body.id;
    console.log(id);
    await quizModel.deleteOne({ _id: id });
    res.send(true);
});
quizRouter.get('/edit', isAuthenticated, async function (req, res) {
    let id = req.query.id;

    let quiz = await quizModel.find({ _id: id });
    console.log(quiz[0].questions);
    res.render("quiz/edit", { quiz: quiz[0] });
});
quizRouter.post('/edit', isAuthenticated, async function (req, res) {
    // let temp = JSON.parse((req.body));
    let temp = req.body;

    // let quiz = new quizModel({
    //     _id: temp.id,
    //     uploader: req.user._id,
    //     title: temp.title,
    //     count_taker: 0,
    //     rate: [],
    //     checked: false,
    //     label: [],
    //     description: "",
    //     questions: temp.questionList,
    //     right_ans_count: 0
    // })
    await quizModel.update({ _id: temp.id }, { title: temp.title, questions: temp.questionList });
    console.log("Success");
    res.redirect("/quiz")

});

quizRouter.get('/preview/:id', async function (req, res) {
    console.log(req.params.id);
    const q = await quizController.GetPreview(req.params.id);
    console.log(q);
    res.json(q);
})

module.exports = quizRouter;