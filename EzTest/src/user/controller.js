const GetTopByTestCount = require("./model").GetTopByTestCount;
const GetByID = require("./model").GetByID;
const userModel = require("./model").model;
const bcrypt = require("bcrypt");
const saltRounds = 10;

const accountSetting = async (req, res) => {

    if (req.user == undefined) {
        res.redirect("/login");
    }
    else {
        const user = await GetByID(req.user._id);
        res.render("account-setting", { user: user });
    }

}
const changePassword = async (req, res) => {

    if (req.user == undefined) {
        res.redirect("/login");
    }
    else {

        let user = await GetByID(req.user._id);
        if (user.password) {
            if (bcrypt.compare(req.body.oldPass, user.password)) {
                user.password = req.body.newPass;
                const hash = await new Promise((resolve, reject) => {
                    bcrypt.hash(user.password, saltRounds, function (err, hash) {
                        if (err) reject(err);
                        resolve(hash);
                    });
                })
                await userModel.updateOne({ _id: req.user._id }, { password: hash });

            }
        }
        else {
            const hash = await new Promise((resolve, reject) => {
                bcrypt.hash(req.body.Password, saltRounds, function (err, hash) {
                    if (err) reject(err);
                    resolve(hash);
                });
            })
            await userModel.updateOne({ _id: req.user._id }, { password: hash });
            user = await GetByID(req.user._id);
        }

        res.redirect("profile");
    }

}
const changeName = async (req, res) => {

    if (req.user == undefined) {
        res.redirect("/login");
    }
    else {
        console.log(req.body.name);
        await userModel.updateOne({ _id: req.user._id }, { name: req.body.name });
        let user = await GetByID(req.user._id);
        res.render("account-setting", { user: user });
    }

}

const GetTopActive = async () => {
    const users = await GetTopByTestCount(5);

    if (users && users.length === 0) {
        return null;
    }

    return users;
}



module.exports = {
    GetTopActive,
    accountSetting,
    changeName,
    changePassword
}