const express = require('express');

const loginRouter = require('./login/routes');
const isAuthenticated = require('./login/controller/passport_strategies').isAuthenticated;

const router = express.Router();

router.use('/login', loginRouter);
// router.use('/user', userRoutes);
// router.use('/test', testRoutes);

router.get('/dashboard', isAuthenticated, (req, res) => {
    res.render('dashboard');
});
router.get('/quizzes', (req, res) => {
    res.render('quizzes');
});
router.get('/quiz-edit', (req, res) => {
    res.render('quiz-edit');
});
module.exports = router;
