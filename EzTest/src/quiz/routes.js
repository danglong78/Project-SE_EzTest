const express = require('express');
const quizModel = require('./model').model;

const quizRouter = express.Router();

quizRouter.get('/', async function (req, res) {
    const x = req.user['_id'];
    const list = await quizModel.find({ uploader: x });
    res.render('quiz/quiz-manager', { quizzes: list });
});
quizRouter.get('/add', function (req, res) {
    res.render('quiz/add');
});
quizRouter.post('/add', async function (req, res) {
    let temp = JSON.parse(JSON.stringify(req.body));
    console.log(temp);

    let Quiz = new quizModel({
        uploader: req.user._id,
        title: temp.title,
        count_taker: 0,
        rate: [],
        checked: false,
        label: [],
        description: "",
        questions: temp.questionList,
        right_ans_count: 0
    })
    console.log("Success");
    res.redirect("/quiz")
    await Quiz.save();

});
quizRouter.post('/delete', async function (req, res) {
    let id = req.body.id;
    console.log(id);
    await quizModel.deleteOne({ _id: id });
    res.redirect("/quiz");
});
quizRouter.get('/edit', async function (req, res) {
    let id = req.query.id;
    let quiz = await quizModel.find({ _id: id });
    console.log(quiz);
    res.render("quiz/edit", { quiz: quiz });
});

module.exports = quizRouter;