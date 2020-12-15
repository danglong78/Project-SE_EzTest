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

var Quiz_Result = async function (id, ans_list, res) {
    try {
        var aquiz = await GetByID(id);
        res.render('quiz_result', {
            quiz: aquiz,
            ans_list: ans_list
        });
    } catch (e) {
        res.send("Load Quiz Error...");
    }
}

const GetRecentQuizzes = () => {


    quizzes => {
        quizzes = quizzes.map(quiz => {
            const avgRate = quiz.rate.reduce((a, b) => a + b.score, 0) / quiz.rate.length
            const questions = quiz.questions.map(ques => {
                return {
                    question: ques.question,
                    answers: ques.answers
                };
            });

            return {
                _id: quiz._id,
                title: quiz.title,
                count_taker: quiz.count_taker,
                avgRate,
                labels: quiz.labels,
                description: quiz.description,
                questions
            };
        });
        return quizzes;
    }
}


module.exports = {
    take_quiz: Get_quiz_taking,
    quiz_result: Quiz_Result
}