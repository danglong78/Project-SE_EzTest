if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const flash = require('connect-flash');
const Routes = require('./src/routes');
const Database = require('./src/database');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('./src/login/controller/passport_strategies').localStrategy;
const googleStrategy = require('./src/login/controller/passport_strategies').googleStrategy;
const facebookStrategy = require('./src/login/controller/passport_strategies').facebookStrategy;
const app = express();


// Log
// app.use(morgan('tiny'));

// Set engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

//
app.use(express.static(path.join(__dirname, 'assets')))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'mysecret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Passport setup
passport.use(localStrategy);
passport.use(googleStrategy);
passport.use(facebookStrategy);


// Flash messages
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


// Routing
// app.use('/', Routes());
app.use('/', Routes);

// Set up mongoose
Database.connect().then(() => {
    console.log('Database connected');
})
    .catch((error) => {
        console.log('Error connecting to database');
    });


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
})
