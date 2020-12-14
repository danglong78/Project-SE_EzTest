const model = require("./model");
const quiz = require("./model").model;

var Get_quiz_taking = function (id, res) {
    quiz.findById(id)
        .then((aQuiz) => {
            res.render('quiz-take', { quiz: aQuiz });
        })
        .catch((err) => {
            return null;
        });
}



module.exports = {
    take_quiz: Get_quiz_taking
}