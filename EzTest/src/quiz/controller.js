const model = require("./model");
const GetByID = require("./model").GetByID;

var Get_quiz_taking = async function (id, res) {
    try {
        var quiz = await GetByID(id);
        res.render('quiz-take', { quiz: quiz });
    } catch (e) {
        res.send("Load Quiz Error...");
    }

}



module.exports = {
    take_quiz: Get_quiz_taking
}