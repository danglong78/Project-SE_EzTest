const User = require('../../user/model').model;
const bcrypt = require('bcrypt');
const saltRounds = 10;

// module.exports.renderRegister = (req, res) => {
//     res.render('login/register');
// }

const isUniqueEmail = async function (email) {
    const user = await User.findOne({ email });
    if (user) {
        return false;
    }
    return true;
}

module.exports = async (req, res) => {
    try {
        console.log(req.body);

        const { name, email, password } = req.body;

        if (!(await isUniqueEmail(email))) {
            throw new Error('This email has already been used for registration');
        }

        const hash = await new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds, function (err, hash) {
                if (err) reject(err);
                resolve(hash);
            });
        })

        const user = new User({ name, email, password: hash });
        console.log(user);

        await user.save();
        req.login(user, function (err) {
            if (err) {
                throw new Error('Something wrong happend. Try again!');
            }
            req.flash("success", "Welcome to EzTest!");
            return res.redirect('localhost:3000/dashboard');
        });

    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/login/register');
    }
}