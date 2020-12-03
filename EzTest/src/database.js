const mongoose = require('mongoose');

module.exports = {
    connect() {
        return mongoose.connect('mongodb+srv://tritri45:45454545@cluster0.yzqlv.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
    }
}