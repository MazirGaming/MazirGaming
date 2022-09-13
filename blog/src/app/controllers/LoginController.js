// const Login = require('../models/Login');

const Register = require('../models/Register');
const passport = require("passport");


class LoginController {
    //GET /login
    login(req, res) {
        res.render('login copy')
    }
    // POST /login
    loginAccount(req, res, next) {
        var username = req.query.username
        Register.findOne({username:username})
            .then(()=>{

                res.redirect('/')
            })
        
    }
}
module.exports = new LoginController;