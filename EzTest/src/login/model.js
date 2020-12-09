const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const loginSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    email: String,
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }
});

var GetByUserID = function (req) {
    var login_data = mongoose.model('login_data', loginSchema);
    const id = req.body.id;
    login_data.find({ userID: id })
        .then((data) => {
            return data[0];
        })
        .catch((err) => {
            return null;
        });
};

var GetByUsername = function (req) {
    var login_data = mongoose.model('login_data', loginSchema);
    const name = req.body.username;
    login_data.find({ username: name })
        .then((data) => {
            return data[0];
        })
        .catch((err) => {
            return null;
        });
};

var GetByEmail = function (req) {
    var login_data = mongoose.model('login_data', loginSchema);
    const mail = req.body.email;
    login_data.find({ email: mail })
        .then((data) => {
            return data[0];
        })
        .catch((err) => {
            return null;
        });
};

module.exports = {
    GetByUserID: GetByUserID,
    GetByEmail: GetByEmail,
    GetByUsername: GetByUsername,
}