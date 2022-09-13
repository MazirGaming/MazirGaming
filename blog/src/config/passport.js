var Register = require('../app/models/Register');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const res = require('express/lib/response');

// var nodemailer = require('nodemailer');
module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });
    
    passport.deserializeUser(function(id, done) {
        Register.findById({
            _id: id
        })
            .then(function(user) {
                done(null, user);
            })
            .catch(function(err) {
                console.log(err);
            });
        });



    passport.use(
        "local.signin",
        new LocalStrategy({
            username: 'username',
            password: 'password',
            passReqToCallback: true,
        }, function (req, username, password, done) {
                Register.findOne({ 'username': username }, function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        return done(null, false, { message: 'Không tồn tại người dùng' });
                    }
                    if (!user.validPassword(password)){
                        return done(null, false, { message: 'bạn đã nhập sai mật khẩu' });
                    }
                    return done(null, user)
                }).clone();
        })
    );

    passport.use(
        'local.admin',
        new LocalStrategy({ passReqToCallback: true }, function (req, username, password, done) {
            Register.findOne({ username: username }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {
                        message: 'Sai tên đăng nhập hoặc mật khẩu.'
                    });
                }
                if (user && user.password == password && user.role == 'admin') {
                    console.log(user)
                    return done(null, user)
                } else {
                    return done(null, false, {
                        message: 'Sai tên đăng nhập hoặc mật khẩu..'
                    })
                }
            }).clone()
        }
        )

    );

    passport.use(
        "local.signup",
        new LocalStrategy({
            username: 'username',
            password: 'password',
            passReqToCallback: true
        }, function (req, username, password, done) {
                Register.findOne({ 'username': username }, function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (user) {
                        return done(null, false, { message: 'Tài khoản đã tồn tại' });
                    }
                    var newUser = new Register();
                    newUser.username = username;
                    newUser.role = 0;
                    // newUser.password = password
                    newUser.password = newUser.encryptPassword(password)
                    newUser.save(function (err, result) {
                        if (err) {
                            return done(err)
                        }
                        return done(null, newUser)
                    })
                }).clone()
        })
    );
    















   




















    //   passport.use(
    //     'local-signup',
    //     new LocalStrategy({ passReqToCallback: true }, function(req, username, password, done) {
    //       User.findOne({ username: username }, function(err, user) {
    //         if (err) {
    //           return done(err);
    //         }
    //         if (user) {
    //           return done(null, false, {
    //             message: 'Tên đăng nhập đã tồn tại!'
    //           });
    //         }

    //         if (password.length <= 6) {
    //           return done(null, false, {
    //             message: 'Mật khẩu phải trên 6 ký tự!'
    //           });
    //         }

    //         if (password !== req.body.password2) {
    //           return done(null, false, {
    //             message: 'Hai mật khẩu không khớp!'
    //           });
    //         }
    //         var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //         if (!re.test(String(req.body.email).toLowerCase())) {
    //           return done(null, false, {
    //             message: 'Địa chỉ email không hợp lệ!'
    //           });
    //         }
    //         User.findOne({ email: req.body.email }, (err, user) => {
    //           if (err) {
    //             return done(err);
    //           } else if (user) {
    //             return done(null, false, {
    //               message: 'Địa chỉ email đã tồn tại!'
    //             });
    //           }
    //         });

    //         bcrypt.hash(password, 12).then(hashPassword => {
    //           const newUser = new User({
    //             username: username,
    //             password: hashPassword,
    //             email: req.body.email
    //           });
    //           // save the user
    //           newUser.save(function(err) {
    //             if (err) return done(err);
    //             return done(null, newUser);
    //           });
    //         });
    //       });
    //     })
    //   );
};