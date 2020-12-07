const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    trust_lable: Boolean,
    test_taking: [{
        score: Number,
        answer_list: [{ answer: Number }],
        quiz: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'quiz',
        },
    }],
    test_uploading: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'quiz',
    }],
});



var GetAllUser = function () {
    var user = mongoose.model('user', userSchema);
    user.find()
        .then((allUser) => {
            return allUser;
        })
        .catch((err) => {
            return null;
        });
};

var GetByID = function (req) {
    var user = mongoose.model('user', userSchema);
    const id = req.body.id;
    user.findById(id)
        .then((aUser) => {
            return aUser[0];
        })
        .catch((err) => {
            return null;
        });
};

var GetByEmail = function (req) {
    var user = mongoose.model('user', userSchema);
    const mail = req.body.email;
    user.find({ email: mail })
        .then((aUser) => {
            return aUser[0];
        })
        .catch((err) => {
            return null;
        });
};

module.exports = {
    GetAllUser: GetAllUser,
    GetByID: GetByID,
    GetByEmail: GetByEmail,
}

