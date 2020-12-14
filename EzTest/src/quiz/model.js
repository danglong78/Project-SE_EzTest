const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const quizSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    uploader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    title: String,
    count_taker: Number,
    rate: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
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
        _id: mongoose.Schema.Types.ObjectId,
        question: String,
        right_answer: Number,
        answers: [{ type: String }],
        comments: [{
            comment: String,
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
            }
        }],
        right_ans_count: Number,
    }],
});

const quiz = mongoose.model('quiz', quizSchema);

var GetbyID = function (in_id) {
    const id = in_id;
    quiz.findById(id)
        .then((aQuiz) => {
            return aQuiz;
        })
        .catch((err) => {
            return null;
        });
};

var GetByUploader = function (req) {
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
    quiz.find({ checked: true })
        .then((Quiz) => {
            return Quiz;
        })
        .catch((err) => {
            return null;
        })
};

var GetUnchecked = function () {
    quiz.find({ checked: false })
        .then((Quiz) => {
            return Quiz;
        })
        .catch((err) => {
            return null;
        })
};

var GetAll = function () {
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
    model: mongoose.model('Quiz', quizSchema)
}