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

module.exports = router;
