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
        answer_list: [Number],
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

const GetTopByTestCount = async function (n) {
    let users = await User.aggregate(
        [
            {
                "$project": {
                    "name": 1,
                    // "test_taking": 1,
                    "length": { "$size": "$test_taking" }
                }
            },
            { "$sort": { "length": -1 } },
            { "$limit": n }
        ]
    )

    if (users.length === 0) {
        return null;
    }

    return users;
}

module.exports = {
    model: User,
    GetAllUser: GetAllUser,
    GetByID: GetByID,
    GetByEmail: GetByEmail,
    GetTopByTestCount
}

