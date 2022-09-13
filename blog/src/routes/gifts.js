const { response } = require('express');
const express = require('express');
const router = express.Router();
const giftController = require('../app/controllers/GiftController');
const passport = require('../config/passport');
// var csrf = require('csurf');
// var csrfProtection = csrf();
// router.use(csrfProtection)


router.post('/:slug/comments', giftController.comments);
router.delete('/:slug/:id',isAdmin, giftController.deleteComment);
router.get('/:slug', giftController.show);

module.exports = router;
function isAdmin(req, res, next){
    if (req.isAuthenticated() && req.user.username == 'admin'){
        return next()
    }
    res.redirect('/')
}