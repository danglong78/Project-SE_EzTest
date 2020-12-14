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
    // let temp = JSON.parse((req.body));
    let temp=req.body;

    let quiz = new quizModel({
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
     await quiz.save();
    console.log("Success");
    res.redirect("/quiz")

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
    console.log(quiz[0].questions);
    res.render("quiz/edit", { quiz: quiz[0] });
});
quizRouter.post('/edit', async function (req, res) {
    // let temp = JSON.parse((req.body));
    let temp=req.body;

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
    await quizModel.update({_id:temp.id},{title: temp.title,questions: temp.questionList});
    console.log("Success");
    res.redirect("/quiz")

});

module.exports = quizRouter;