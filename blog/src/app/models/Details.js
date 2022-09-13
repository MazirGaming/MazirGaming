const mongoose = require('mongoose')
const Gift = require('../models/Gift');
// // var slug = require('mongoose-slug-generator');
// mongoose.plugin(slug);
const Schema = mongoose.Schema;

const Details = new Schema({
    // _id: String,
    color: String,
    material: String,
    size: String,
    gifts: {
        // type: Schema.Types.ObjectId,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gift',
      }
})

module.exports = mongoose.model('Details', Details);




  