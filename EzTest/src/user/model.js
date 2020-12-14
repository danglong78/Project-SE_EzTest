const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    googleID: {
        type: String,
        unique: true
    },
    facebookID: {
        type: String,
        unique: true
    },

    trust_lable: {
        type: Boolean,
        default: false
    },
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
    }]
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
    model: mongoose.model('User', userSchema),
    GetAllUser: GetAllUser,
    GetByID: GetByID,
    GetByEmail: GetByEmail
}

