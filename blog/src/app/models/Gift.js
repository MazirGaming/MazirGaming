const Details = require('../models/Details');
const Cart = require('./Cart');
const mongoose = require('mongoose')
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const Gift = new Schema({
    discount: Number, 
    name: String,
    qty: Number,
    price: Number,
    image: String,
    image2: String,
    slug: { type: String, slug: "name", unique:true },
    describle: String,
    category: String,
    details: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Details',
    }],
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comments',
    }],
  }, {
    timestamps:true,
  });
  Gift.index({name: 'text', price: 'text'})
  module.exports = mongoose.model('Gift', Gift);




  