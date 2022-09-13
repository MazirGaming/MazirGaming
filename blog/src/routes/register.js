const express = require('express');
const router = express.Router();
const registerController = require('../app/controllers/RegisterController');
const authController = require('../app/controllers/AuthController');
const { check, validationResult } = require('express-validator');
var csrf = require('csurf');
var csrfProtection = csrf();
var bodyParser = require('body-parser')
var parseForm = bodyParser.urlencoded({ extended: false })
router.use(csrfProtection)
const passport = require('../config/passport');


router.get('/', authController.getRegister);
router.post('/', authController.postRegister);

// router.get('/', registerController.register);
// router.post('/', registerController.registered);

module.exports = router;