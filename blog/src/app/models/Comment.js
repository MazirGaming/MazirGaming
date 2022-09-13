const mongoose = require('mongoose')
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const Comments = new Schema({
    author: String, 
    comment: String,
})

module.exports = mongoose.model('Comments', Comments);




  