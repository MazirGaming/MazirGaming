const express = require('express');
const router = express.Router();
const session = require('express-session')
const passport = require('../config/passport');
const categoryController = require('../app/controllers/CategoryController');

router.get('/:slug', categoryController.show);


module.exports = router;
