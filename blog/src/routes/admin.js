const express = require('express');
const { serializeUser } = require('passport');
const router = express.Router();
const adminController = require('../app/controllers/AdminController');
const authController = require('../app/controllers/AuthController');
// var csrf = require('csurf');
// var csrfProtection = csrf();
// router.use(csrfProtection)
const passport = require('../config/passport');




router.get('/create', isAdmin, adminController.create);
router.get('/account', isAdmin,adminController.account);
router.delete('/account/:id', isAdmin,adminController.deleteAccount);
router.get('/orders', isAdmin,adminController.orders);
router.delete('/orders/:id', isAdmin,adminController.deleteOrder);
router.get('/orders/:id/edit', isAdmin,adminController.detailOrder);
router.put('/orders/:id', isAdmin,adminController.updateOrder);
router.post('/create', isAdmin,adminController.create);
router.post('/store', isAdmin,adminController.store);
router.get('/list', isAdmin,adminController.list);
router.get('/:id/edit', isAdmin,adminController.edit);
router.put('/:id', isAdmin,adminController.update);
router.delete('/:id', isAdmin,adminController.delete);
router.get('/category', isAdmin,adminController.category);
router.get('/category/:id/edit', isAdmin,adminController.categoryEdit);
router.put('/category/:id', isAdmin,adminController.updateCategory);
router.delete('/category/:id', isAdmin,adminController.deleteCategory);
router.get('/category/add', isAdmin,adminController.showCategory);
router.post('/category/add', isAdmin,adminController.addCategory);
router.get('/thongke', isAdmin,adminController.showTK);
router.post('/thongke', isAdmin,adminController.searchTK);

router.get('/', isAdmin,adminController.admin);
router.post('/', isAdmin,adminController.checkAdmin);


module.exports = router;
function isAdmin(req, res, next){
    if (req.isAuthenticated() && req.user.username == 'admin'){
        return next()
    }
    res.redirect('/')
}