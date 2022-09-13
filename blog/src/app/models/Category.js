const mongoose = require('mongoose')
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const Category = new Schema({
    title: String,
    slug: { type: String, slug: "title", unique:true },
})

module.exports = mongoose.model('Category', Category);




  