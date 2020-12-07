const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const quizSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    uploader: {
        type: mongoose.Schema.type.ObjectId,
        ref: 'user',
    },
    title: String,
    count_taker: Number,
    rate: [{
        user: {
            type: mongoose.Schema.type.ObjectId,
            ref: 'user',
        },
        score: Number,
        comment: String,
    }],
    checked: Boolean,
    lable: [{
        name: String,
    }],
    description: String,
    questions: [{
        _id: mongoose.Schema.type.ObjectId,
        question: String,
        right_answer: Number,
        answers: [{ answer: String }],
        comments: [{
            comment: String,
            user: {
                type: mongoose.Schema.type.ObjectId,
                ref: 'user',
            }
        }],
        right_ans_count: Number,
    }],
});

var GetbyID = function (req) {
    var quiz = mongoose.model('quiz', quizSchema);
    const id = req.body.id;
    quiz.findById(id)
        .then((aQuiz) => {
            return aQuiz;
        })
        .catch((err) => {
            return null;
        });
};

var GetByUploader = function (req) {
    var quiz = mongoose.model('quiz', quizSchema);
    const uploader_id = req.body.uploader_id;
    quiz.find({ uploader: uploader_id })
        .then((Quiz) => {
            return Quiz;
        })
        .catch((err) => {
            return null;
        });
};

var GetChecked = function () {
    var quiz = mongoose.model('quiz', quizSchema);
    quiz.find({ checked: true })
        .then((Quiz) => {
            return Quiz;
        })
        .catch((err) => {
            return null;
        })
};

var GetUnchecked = function () {
    var quiz = mongoose.model('quiz', quizSchema);
    quiz.find({ checked: false })
        .then((Quiz) => {
            return Quiz;
        })
        .catch((err) => {
            return null;
        })
};

var GetAll = function () {
    var quiz = mongoose.model('quiz', quizSchema);
    quiz.find()
        .then((Quiz) => {
            return Quiz;
        })
        .catch((err) => {
            return null;
        })
};

module.exports = {
    GetByID: GetbyID,
    GetByUploader: GetByUploader,
    GetChecked: GetChecked,
    GetUnchecked: GetUnchecked,
    GetAll: GetAll,
}