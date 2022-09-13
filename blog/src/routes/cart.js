const express = require('express');
const router = express.Router();
const session = require('express-session')
// var csrf = require('csurf');
// var csrfProtection = csrf();
// router.use(csrfProtection) //mới xóa
const passport = require('../config/passport');



const cartController = require('../app/controllers/CartController');

router.get('/checkout',isLoggedIn, cartController.checkout);
router.post('/checkout',isLoggedIn, cartController.submit);

router.get('/reduce/:id', cartController.reduce);
router.get('/remove/:id', cartController.remove);


router.get('/add/:id', cartController.show);
router.get('/', cartController.cart);

module.exports = router;
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next()
    }
    req.session.oldUrl = req.url
    res.redirect('/user/login')
}