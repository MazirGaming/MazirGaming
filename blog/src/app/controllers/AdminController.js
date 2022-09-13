const { redirect } = require('express/lib/response');
const Gift = require('../models/Gift');
const Details = require('../models/Details');
const Register = require('../models/Register');
const Order = require('../models/Order');
const Category = require('../models/Category');
const passport = require("passport");

class AdminController {
    //POST /admin
    checkAdmin(req, res, next){
        var username = req.body.username
        var password = req.body.password
        Register.findOne({
            username: username,
            // password: password
        }).lean()
        .then(data => {
            if (!data){
                res.render('login', {
                    mess: ['Tài khoản không tồn tại']
                });
                return;
                // res.redirect('/')
            }
            if (data.password !== password){
                res.render('login', {
                    mess: ['Sai mật khẩu']
                });
                return;
            }
            if (data.role !== 'admin'){
                res.render('login', {
                    mess: ['Bạn cần phải đăng nhập tài khoản Admin']
                });
                return;
            } else {
                // res.cookie('role', data.role)
                res.redirect('./admin/home')
            }
            // res.redirect('./admin/home')
        // res.cookie('role', data.role)
        
        })
        .catch(err => {
            res.status(500).json('Lỗi server1')
        })
    }
    //GET /admin
    admin(req, res, next) {
        const totalGift = new Promise((resolve, reject)=> {
            Gift.find({}).lean()
            .then((gifts)=> resolve(gifts.length))
            // .then(gifts => res.render('./admin/adminHome', {gifts, layout: 'admin'}))
            .catch(next)
        })
        const totalAccount = new Promise((resolve, reject)=> {
            Register.find({}).lean()
            .then((accounts)=> resolve(accounts.length))
            // .then(gifts => res.render('./admin/adminHome', {gifts, layout: 'admin'}))
            .catch(next)
        })
        const totalOrder = new Promise((resolve, reject)=> {
            Order.find({}).lean()
            .then((orders)=> resolve(orders.length))
            // .then(gifts => res.render('./admin/adminHome', {gifts, layout: 'admin'}))
            .catch(next)
        })
        Promise.all([totalGift, totalAccount, totalOrder])
            .then((total)=>{
                res.render('./admin/adminHome', 
                {totalGift: total[0],
                totalAccount: total[1],
                totalOrder: total[2],
                layout: 'admin'})
            })
        
    }
    //GET /admin/create
    create(req, res, next) {
        Category.find({}).lean()
            .then(category => 
                res.render('./admin/adminCreate', {category, layout: 'admin'})
            )
    }
    //GET /admin/detail
    detail(req, res, next) {
        res.render('./admin/adminCreateDetails.handlebars',{layout: 'admin'})
    }
    
    //POST /admin/create
    store(req, res, next) {
        const gift = new Gift(req.body);
        gift.save((err, result)=>{
            if (err){
                console.log(err)
            } else {
                const detail = new Details(req.body)
                detail.save((err, details)=>{
                    Gift.findOne({ _id: result._id}, (err, data)=>{
                        if (err){
                            console.log(err)
                        } else {
                            data.details.push(details)
                            data.save()
                            console.log(data)
                            console.log("=========================")
                            console.log(details)
                            res.redirect('/admin/list')
                        }
                        
                    })
                })       
            }
        })
    }
 
    // GET /admin/list
    list(req, res, next) {
        Gift.find({}).lean()
            .then(gifts => res.render('./admin/adminList', {gifts, layout: 'admin'}))
            .catch(next)
        }
    //GET /admin/:id/edit
    edit(req, res, next) {
        Gift.findById(req.params.id).lean()
            .populate('details')
            .then(gifts => res.render('./admin/adminUpdate', {gifts, layout: 'admin'}))
            .catch(next)
    }
    //PUT /admin/:id
    update(req, res, next) {
        console.log(req.body)
       
        Gift.updateOne({ _id: req.params.id }, req.body)
            .then()
        Details.updateOne({_id: req.body.details}, req.body)
       
   
            .then(() => res.redirect('/admin/list'))
            .catch(next)
    }
    delete(req, res, next) {
        Gift.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    //GET Account
    account(req, res, next) {
        console.log(req.body)
        Register.find({}).lean()
            .then(accounts => res.render('./admin/adminAccount', {accounts, layout: 'admin'}))
            .catch(next)
        }
    deleteAccount(req, res, next) {
        Register.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    //GET orders
    orders(req, res, next) {
        Order.find({}).lean()
            .then(orders => res.render('./admin/adminOrders', {orders, layout: 'admin'}))
            .catch(next)
        }
    deleteOrder(req, res, next) {
        Order.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    //GET Order/detail
    detailOrder(req, res, next) {
        // Order.find({_id: req.params.id}).lean()
        // .then(data => res.render('./admin/adminOrderDetails', {data, layout: 'admin'}))
        // .catch(next)
        Order.findById(req.params.id).lean()
        .then(data => res.render('./admin/adminOrderDetails', {data, layout: 'admin'}))
        .catch(next)
      
    }
    updateOrder(req, res, next) {
        Order.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/orders'))
            .catch(next)
    }    
    //GET /category
    category(req, res, next) {
        Category.find({}).lean()
            .then(category => res.render('./admin/adminCategory', {category, layout: 'admin'}))
            .catch(next)
    }
    //GET /category/add
    showCategory(req, res, next) {
        res.render('./admin/adminCreateCategory', {layout: 'admin'})
    }

    addCategory(req, res, next) {
        const category = new Category(req.body);
        category.save()
        // res.redirect('/admin/category', {mess: 'Thêm danh mục thành công', layout: 'admin'})
        res.render('./admin/adminCreateCategory', {mess: 'Thêm danh mục thành công', layout: 'admin'})
    }
    categoryEdit(req, res, next){
        Category.findById(req.params.id).lean()
            .then(categoryE => 
                res.render('./admin/adminCategoryEdit', {categoryE, layout: 'admin'}))
            .catch(next)
    }
    updateCategory(req, res, next){
        Category.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/category'))
            .catch(next)
    }   
    deleteCategory(req, res, next) {
        Category.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
    
    showTK(req, res, next) {
        res.render('./admin/adminThongKe', {layout: 'admin'})
    }

    searchTK(req, res, next){
        var date1 = new Date(req.body.date1);
        var date2 = new Date(req.body.date2);
        var date1Str = date1.toDateString()
        var date2Str = date2.toDateString()
        var totalThongKe = 0
        console.log(date1.toDateString())
        Order.find({status:'Đã Giao Hàng'}).lean()
            .then((data) => 
                {
                    for (var i=0; i<data.length; i++ ){
                        if(date1 <= data[i].updatedAt && data[i].updatedAt <= date2 ){
                            totalThongKe = totalThongKe + data[i].cart.totalPrice
                        }
                    }
                    console.log(totalThongKe)
                    res.render('./admin/adminThongKe', {layout:'admin', data, totalThongKe, date1Str, date2Str, user: req.user})
                })
            .catch(next)
    } 
} 


module.exports = new AdminController