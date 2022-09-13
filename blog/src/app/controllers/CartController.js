const Gift = require('../models/Gift')
// const Details = require('../models/Details')
const Cart = require('../models/Cart')
const Order = require('../models/Order')
// const { show } = require('./GiftController')
// const res = require('express/lib/response')
// const { count } = require('../models/Details')
const session = require('express-session')
const { mapReduce } = require('../models/Gift')

class CartController {

    //GET /cart
    cart(req, res, next) {
        if (!req.session.cart) {
            return res.render('cart', { gifts: null })
        }
        var cart = new Cart(req.session.cart)
        res.render('cart', { gifts: cart.generateArray(), totalPrice: cart.totalPrice })
    }

    //GET /add to cart
    show(req, res, next) {
        var giftId = req.params.id
        var cart = new Cart(req.session.cart ? req.session.cart : {})
        Gift.findById(giftId, function (err, gift) {
            {
                if (err) {
                    return res.redirect("back");
                }
                cart.add(gift, gift.id);
                req.session.cart = cart;
                console.log(req.session.cart)
                res.redirect('/')
            }
        })
    }

    checkout(req, res, next) {
        if (!req.session.cart) {
            return res.redirect('/cart')
        }
        var cart = new Cart(req.session.cart)
        res.render("checkout", {
            total: cart.totalPrice,
        });
    }
    submit(req, res, next) {
        if (!req.session.cart) {
            res.redirect("/cart");
        }
        var cart = new Cart(req.session.cart)
        console.log(req.user)
        var order = new Order({
            user: req.user,
            cart: cart,
            address: req.body.address,
            name:req.body.name,
            phone: req.body.phone,
            status: 'Đang Xử Lý'
        });
        order.save(function(err, result){
            req.session.cart = null
            res.redirect('/')
        })
    }
    reduce(req, res, next){
        var giftId = req.params.id
        var cart = new Cart(req.session.cart ? req.session.cart : {})
        cart.reduceByOne(giftId);
        req.session.cart = cart
        res.redirect('/cart')
    }
    remove(req, res, next){
        var giftId = req.params.id
        var cart = new Cart(req.session.cart ? req.session.cart : {})
        cart.remove(giftId);
        req.session.cart = cart
        res.redirect('/cart')
    }
}


module.exports = new CartController