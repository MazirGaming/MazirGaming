const Register = require('./Register');
const Cart = require('./Cart');
const mongoose = require('mongoose')
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const Order = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Register'
    },
    status:{
      type: String,
      required:true
    },
    cart: {
        type: Object,
        required:true
    },
    address:{
      type: String,
      required:true
    },
    name:{
    type: String,
      required:true
    },
    phone:{
      type: String,
        required:true
      }
  }, {
    timestamps:true,
  });
module.exports = mongoose.model('Order', Order);




  