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
        type: String
    },
    facebookID: {
        type: String
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

const User = mongoose.model('User', userSchema);

var GetAllUser = async function () {
    return await User.find();
};

var GetByID = async function (in_id) {
    const id = in_id;
    return await User.findById(id);
};

var GetByEmail = async function (in_email) {
    const mail = in_email;
    return await User.find({ email: mail })[0];
};

module.exports = {
    model: User,
    GetAllUser: GetAllUser,
    GetByID: GetByID,
    GetByEmail: GetByEmail
}

