const express = require('express');
const router = express.Router();
// const LocalStrategy = require('passport-local').Strategy
// const authController = require('../app/controllers/AuthController');
const loginController = require('../app/controllers/LoginController');
// var csrf = require('csurf');
// var csrfProtection = csrf();
// var bodyParser = require('body-parser')
// var parseForm = bodyParser.urlencoded({ extended: false })
// router.use(csrfProtection) // mới xóa
// const passport = require('../config/passport');

router.get('/', loginController.login);
router.post('/',loginController.loginAccount);

module.exports = router;