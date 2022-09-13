const express = require('express');
const router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf();
router.use(csrfProtection)
const passport = require('../config/passport');

const siteController = require('../app/controllers/SiteController');

    router.get('/search', siteController.search);
    router.get('/', siteController.index);

module.exports = router;
function isUser(req, res, next){
    if (req.user.username != 'admin'){
        return next()
    }
    res.redirect('/admin')
}