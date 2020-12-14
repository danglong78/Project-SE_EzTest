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
var GetByUserID = async function (in_id) {
    const id = in_id;
    return await Login.find({ userID: id });
};

var GetByUsername = async function (username) {
    const name = username;
    return await Login.find({ username: name })[0];
};

var GetByEmail = async function (email) {
    const mail = email;
    return await Login.find({ email: mail })[0];
};

module.exports = {
    GetByUserID: GetByUserID,
    GetByEmail: GetByEmail,
    GetByUsername: GetByUsername,
    model: Login
}