const Quiz = require("./model").model;
const GetLatestQuizzes = require("./model").GetLatestQuizzes;
const GetTopViewQuizzes = require("./model").GetTopViewQuizzes;
const FullTextSearch = require("./model").FullTextSearch;
const GetByID = require("./model").GetByID;
const UserByID = require("../user/model").GetByID;
const UserModel = require("../user/model").model;

var Get_quiz_taking = async function (id, res) {
    try {
        var quiz = await GetByID(id);
        res.render('quiz-take', { quiz: quiz });
    } catch (e) {
        res.send("Load Quiz Error...");
    }

}

var Quiz_Result = async function (id, ans_list, req, res) {
    try {
        var aquiz = await GetByID(id);
        aquiz.count_taker += 1;
        var score = 0;
        for (var i = 0; i < ans_list.length; i++) {
            if (ans_list[i] == aquiz.questions[i].right_answer) {
                aquiz.questions[i].right_ans_count += 1;
                score += 1;
            }
        }
        var auser = await UserByID(req.user._id);
        auser.test_taking.push({
            score: score,
            answer_list: ans_list,
            quiz: id
        });
        console.log(auser);
        console.log(req.user._id);
        console.log(aquiz);
        UserModel.update({ _id: req.user._id }, { $set: auser }).exec();
        Quiz.update({ _id: id }, { $set: aquiz }).exec();
        res.render('quiz_result', {
            quiz: aquiz,
            ans_list: ans_list,
            score: score
        });
    } catch (e) {
        res.send("Load Quiz Error...");
    }
}

const GetRecentQuizzes = async () => {
    let quizzes = await GetLatestQuizzes(5);

    if (quizzes.length === 0) {
        return null;
    }

    quizzes = quizzes.map(quiz => {
        const avgRate = (quiz.rate.reduce((a, b) => a + b.score, 0) / quiz.rate.length).toFixed(1);
        const questions = quiz.questions.map(ques => {
            return {
                question: ques.question,
                answers: ques.answers
            };
        });

        return {
            _id: quiz._id,
            title: quiz.title,
            count_taker: quiz.count_taker,
            avgRate,
            labels: quiz.labels,
            description: quiz.description,
            questions
        };
    });
    return quizzes;
};

const GetPopularQuizzes = async () => {
    let quizzes = await GetTopViewQuizzes(5);

    if (quizzes.length === 0) {
        return null;
    }

    quizzes = quizzes.map(quiz => {
        const avgRate = (quiz.rate.reduce((a, b) => a + b.score, 0) / quiz.rate.length).toFixed(1);
        const questions = quiz.questions.map(ques => {
            return {
                question: ques.question,
                answers: ques.answers
            };
        });

        return {
            _id: quiz._id,
            title: quiz.title,
            count_taker: quiz.count_taker,
            avgRate,
            labels: quiz.labels,
            description: quiz.description,
            questions
        };
    });
    return quizzes;
};

const GetPreview = async (id) => {
    let q = await GetByID(id);


    if (!q) return null;

    let questions = q.questions.map((ques) => {
        return { question: ques.question, answers: ques.answers };
    })

    q = { title: q.title, questions };
    q.questions = q.questions.slice(0, 5);

    return q;
}

const Search = async (keywords) => {
    let quizzes = await FullTextSearch(keywords);
    console.log(quizzes);

    if (quizzes.length === 0) {
        return null;
    }

    quizzes = quizzes.map(quiz => {
        const avgRate = (quiz.rate.reduce((a, b) => a + b.score, 0) / quiz.rate.length).toFixed(1);
        const questions = quiz.questions.map(ques => {
            return {
                question: ques.question,
                answers: ques.answers
            };
        });

        return {
            _id: quiz._id,
            title: quiz.title,
            count_taker: quiz.count_taker,
            avgRate,
            labels: quiz.labels,
            description: quiz.description,
            questions
        };
    });
    return quizzes;
}

const getAllQuiz = async function(req,res){
    var quiz_list = await Quiz.find();
    return quiz_list;
}

const tag_checked = async function(req,res){
    var id = req.body.quiz_id;
    var aQuiz = await Quiz.findById(id);
    if(aQuiz==null){
        return false;
    }
    aQuiz.checked = true;
    Quiz.updateOne({_id:id},{$set:aQuiz}).exec();
    return true;
}

const del_quiz = async function(req,res){
    var id = req.body.quiz_id;
    Quiz.findByIdAndDelete(id).exec();
    return true;
}


module.exports = {
    take_quiz: Get_quiz_taking,
    GetRecentQuizzes,
    GetPopularQuizzes,
    GetPreview,
    Search,
    quiz_result: Quiz_Result,
    GetAllQuiz: getAllQuiz,
    setChecked: tag_checked,
    deleteQuiz:del_quiz
}