const Register = require('../models/Register');
const passport = require("passport");
var bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const errors = null

class RegisterController {
    register(req, res){
        res.render('register', {csrfToken: req.csrfToken()})
    }
    
    //POST /register
    registered(req, res, next) {


        // var username = req.body.username
        // var password = req.body.password
        // check('username', 'Name is required!').not().isEmpty(),
        // check('passwword', 'Passwword is required!').not().isEmpty(),
        // check('repassword', 'Password is not match').not().isEmpty()
        // var errors = validationResult(req);
        // if (errors) {
        //     res.render('register', {
        //         errors: ['Thông tin nhập không được trống']
        //     })
        // } else {

        //     Register.findOne({ username: username }, function (err, user) {
        //         if (err) console.log(err)
        //         if (user) {
        //             res.render('register', {
        //                 mess: ['Tài khoản đã tồn tại, Vui lòng chọn tên đăng nhập khác ']
        //             })
        //             return
        //             req.flash('danger', 'Tài khoản đã tồn tại, Vui lòng chọn tên đăng nhập khác')
        //             // res.redirect('/register')
        //         } else {
        //             var user = new Register({
        //                 username: username,
        //                 password: password,
        //                 role: 'user',
        //             })
        //             bcrypt.genSalt(10, function (er, salt) {
        //                 bcrypt.hash(user.password, salt, function (er, hash) {
        //                     user.password = hash;
        //                     user.save(function (err) {
        //                         if (err) {
        //                             console.log(err)
        //                         } else {
        //                             req.flash('success', 'Đăng ký thành công')
        //                             res.redirect('/login')
        //                         }
        //                     })
        //                 })
        //             })
        //         }
        //     })
        // }








        
        // Register.findOne({
        //     username: req.body.username
        // })
        // .then(data => {
        //     if (data){
        //         res.render('register', {
        //             mess: ['Tài khoản đã tồn tại']
        //         })
        //         return;
        //     } else {
        //         if(req.body.password !== req.body.repassword){
        //             res.render('register', {
        //                 mess: ['Mật khẩu không khớp!']
        //             })

        //         } else{
        //         res.redirect('/login')
        //         return Register.create({
        //             username : username,
        //             password: password,
        //             role: 'user',
        //         })  }
        //     }
        // })
        // // .then(data => {
        // //     res.redirect('/login')
        // // })
        // .catch(err => {
        //     res.status(500).json('Lỗi server')})
    }
}
module.exports = new RegisterController;