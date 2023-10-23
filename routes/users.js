const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const { storeReturnTo } = require('../middleware');
const users = require('../controllers/users')


router.get('/register', users.registerform )

router.post('/register', catchAsync (users.registeruser));

router.get('/login', (req, res) => {
    res.render('users/login');
})

router.post('/login',storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login'}), users.userlogin)

router.get('/logout', users.userlogout);

module.exports = router;