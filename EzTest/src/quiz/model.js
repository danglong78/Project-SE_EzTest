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


var GetbyID = async function (in_id) {
    const id = in_id;
    var aquiz = await Quiz.findById(id);
    return aquiz;
};

var GetByUploader = async function (up_id) {
    // const id = req.body.uploader_id;
    // Quiz.find({ uploader: uploader_id })
    //     .then((quiz) => {
    //         return quiz;
    //     })
    //     .catch((err) => {
    //         return null;
    //     });
    const id = up_id;
    var quizzes = await Quiz.find({ uploader: id })[0];
    return quizzes;
};

var GetChecked = async function () {
    return await Quiz.find({ checked: true });
};

var GetUnchecked = async function () {
    return await Quiz.find({ checked: false });
};

var GetAll = async function () {
    return await Quiz.find();
};

const GetLatestQuizzes = function (n) {
    Quiz.find()
        .sort({ _id: 1 })
        .limit(n)
        .then(quizzes => {
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
    GetLatestQuizzes,
    model: Quiz
}