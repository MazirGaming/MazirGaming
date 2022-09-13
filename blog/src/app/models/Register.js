const mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')


// // var slug = require('mongoose-slug-generator');
// mongoose.plugin(slug);
const Schema = mongoose.Schema;
const Register = new Schema({
    username: {type: String, require:true},
    password: {type: String, required: [true, 'Bạn cần điền mật khẩu'], minlength: [6,'nhập nhiều hơn 6 ký tự']}, 
    role: Number,
})
Register.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
}
Register.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}
module.exports = mongoose.model('Register', Register);




