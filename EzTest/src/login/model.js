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


const Login = mongoose.model('login_data', loginSchema);
var GetByUserID = function (req) {
    const id = req.body.id;
    Login.find({ userID: id })
        .then((data) => {
            return data[0];
        })
        .catch((err) => {
            return null;
        });
};

var GetByUsername = function (req) {
    const name = req.body.username;
    Login.find({ username: name })
        .then((data) => {
            return data[0];
        })
        .catch((err) => {
            return null;
        });
};

var GetByEmail = function (req) {
    const mail = req.body.email;
    Login.find({ email: mail })
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
    model: Login
}