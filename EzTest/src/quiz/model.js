const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const quizSchema = mongoose.Schema({
    uploader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    title: String,

    count_taker: Number,

    rate: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        score: Number,
        comment: String,
    }],

    checked: Boolean,

    labels: {
        free: Boolean,
        field: [{ name: String }]

    },

    description: String,

    questions: [{
        _id: mongoose.Schema.Types.ObjectId,

        question: String,

        right_answer: Number,

        answers: [{ type: String }],

        comments: [{
            comment: String,
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            }
        }],

        right_ans_count: Number,
    }],
});

const Quiz = mongoose.model('Quiz', quizSchema);


var GetbyID = function (in_id) {
    const id = in_id;
    Quiz.findById(id)
        .then((aQuiz) => {
            return aQuiz;
        })
        .catch((err) => {
            return null;
        });
};

var GetByUploader = function (req) {
    const uploader_id = req.body.uploader_id;
    Quiz.find({ uploader: uploader_id })
        .then((quiz) => {
            return quiz;
        })
        .catch((err) => {
            return null;
        });
};

var GetChecked = function () {
    Quiz.find({ checked: true })
        .then((quiz) => {
            return quiz;
        })
        .catch((err) => {
            return null;
        })
};

var GetUnchecked = function () {
    Quiz.find({ checked: false })
        .then((quiz) => {
            return quiz;
        })
        .catch((err) => {
            return null;
        })
};

var GetAll = function () {
    Quiz.find()
        .then((quiz) => {
            return quiz;
        })
        .catch((err) => {
            return null;
        })
};

const GetLatestQuizzes = function () {
    Quiz.find()
        .sort({ _id: 1 })
        .limit(10)
        .then(quizzes => {
            quizzes = quizzes.map(quiz => {
                const avgRate = quiz.rate.reduce((a, b) => a + b.score, 0) / quiz.rate.length
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
        })
        .catch((err) => {
            return null;
        });
}

module.exports = {
    GetByID: GetbyID,
    GetByUploader: GetByUploader,
    GetChecked: GetChecked,
    GetUnchecked: GetUnchecked,
    GetAll: GetAll,
    model: Quiz
}