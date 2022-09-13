const siteRouter = require('./site')
const giftsRouter = require('./gifts')
const adminRouter = require('./admin')
const registerRouter = require('./register')
const cartRouter = require('./cart')
const userRouter = require('./user')
const loginRouter = require('./login')
const categoryRouter = require('./category')
// const authController = require('../app/controllers/AuthController');
const passport = require('../config/passport');
// var csrf = require('csurf');
// var csrfProtection = csrf();

function route(app) {
    app.use('/gifts', giftsRouter)
    app.use('/cart', cartRouter)
    app.use('/admin', adminRouter)
    app.use('/register', registerRouter)
    app.use('/login', loginRouter)
    app.use('/user', userRouter)
    app.use('/category', categoryRouter)
    app.use('/', siteRouter)
}
module.exports = route;
function isUser(req, res, next){
    if (req.isAuthenticated() && req.user.username != 'admin'){
        return next()
    }
    res.redirect('/admin')
}