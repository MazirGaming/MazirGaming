const express = require('express');
const router = express.Router();
// var csrf = require('csurf');
// var csrfProtection = csrf();
// router.use(csrfProtection)
const Order = require('../app/models/Order');
const authController = require('../app/controllers/AuthController');
const Cart = require('../app/models/Cart');

    
    router.get('/profile',isLoggedIn, function(req,res,next){
        Order.find({user: req.user}).lean()
        .exec(function(err, orders) {
            if(err){
                return res.write('Error!');
            }
            var cart;
            orders.forEach(function (order) {
                cart = new Cart(order.cart);
                order.items = cart.generateArray();
            });
            res.render('profile', { orders: orders });
        });
    });
    router.post('/profile/:slug', isLoggedIn, function(req, res, next){
        Order.updateOne({_id: req.params.slug}, req.body)
        .then(() => res.redirect('/user/profile'))
        .catch(next)
    })
    router.get('/logout', isLoggedIn, function(req, res, next) {
        req.logout(function(err) {
          if (err) { return next(err); }
          res.redirect('/');
        });
      });
    router.use('/', notLoggedIn, function(req, res, next){
        next()
    })

    router.get('/register', authController.getRegister);
    router.post('/register', authController.postRegister);
    
    router.get('/login', authController.getLogin);
    router.post('/login',authController.postLogin);

    



module.exports = router;
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next()
    }
    res.redirect('/')
}
function notLoggedIn(req, res, next){
    if (!req.isAuthenticated()){
        return next()
    }
    res.redirect('/')
}
