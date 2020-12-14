const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcrypt');
const User = require('../../user/model').model;



passport.serializeUser(function (user, done) {
    console.log("Serialize:");
    console.log(user);
    console.log(user._id);
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        user = await User.findById({ _id: id });
        console.log("\nDeserialize:");
        console.log(id);
        console.log(user);
        done(null, user);
    }
    catch (err) {
        done(err, null);
    }
});



// aynsc (id, done) => {
//     try {

//         console.log("\nDeserialize:");
//         console.log(id);
//         console.log(user);
//         done(null, user);
//     }
//     catch (err) {
//         done(err, null);
//     }

// }

module.exports.localStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
    function (req, email, password, done) {
        User.findOne({ email: email }, async (err, user) => {
            // console.log(user);
            if (err) {
                return done(err, false, req.flash('error', 'Something wrong happened. Try again!'));
            }
            if (!user) {
                return done(null, false, req.flash('error', 'Incorrect email or password'));
            }
            if (!(await bcrypt.compare(password, user.password))) {
                return done(null, false, req.flash('error', 'Incorrect email or password'));
            }
            return done(null, user, req.flash('success', 'Welcome to EzTest'));
        });
    }
);

module.exports.googleStrategy = new GoogleStrategy({
    clientID: "853828271569-v66qihrik6aehlcevkmbt4c557g2dhfb.apps.googleusercontent.com",
    clientSecret: "l7vn8dXY1Vyst6HcffH3uHYv",
    callbackURL: "http://localhost:3000/login/auth/google/callback",
    passReqToCallback: true
},
    function (req, accessToken, refreshToken, profile, done) {
        // console.log(profile);
        User.findOne({ googleID: profile.id }, async function (err, user) {
            if (err) {
                return done(err, false, req.flash('error', 'Something wrong happened. Try again!'));
            }

            if (user) return done(null, user, req.flash('success', 'Welcome to EzTest'));
            else {
                const newUser = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: profile.password || "",
                    googleID: profile.id
                });

                try {
                    await newUser.save();
                    return done(null, newUser, req.flash('success', 'Welcome to EzTest'));
                }
                catch (e) {
                    return done(e, false);
                }
            };
        }
        )
    });

module.exports.facebookStrategy = new FacebookStrategy({
    clientID: "750118305860704",
    clientSecret: "c1cf6bc4928796e2e8d55df2c8ed5660",
    callbackURL: "http://localhost:3000/login/auth/facebook/callback",
    passReqToCallback: true,
    profileFields: ['id', 'emails', "displayName"],
},
    function (req, accessToken, refreshToken, profile, done) {
        // console.log(profile);
        User.findOne({ facebookID: profile.id }, async function (err, user) {
            if (err) {
                return done(err, false, req.flash('error', 'Something wrong happened. Try again!'));
            }

            if (user) return done(null, user, req.flash('success', 'Welcome to EzTest'));
            else {
                const newUser = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: profile.password || "",
                    facebookID: profile.id
                });

                try {
                    await newUser.save();
                    return done(null, newUser, req.flash('success', 'Welcome to EzTest'));
                }
                catch (e) {
                    return done(e, false);
                }
            };
        }
        )
    });


module.exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash('error', 'You are not logged in right now. Please try login again.');
        res.redirect("http://localhost:3000/dashboard");
    }
}