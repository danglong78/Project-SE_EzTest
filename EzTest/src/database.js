const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost:27017/ez-test'


module.exports = {
    connect() {
        return mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
    }
}