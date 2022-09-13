const Category = require('../models/Category')
const Gift = require('../models/Gift')


class CategoryController {
    //GET /category/:slug
    show(req, res, next) {
        var slug = req.params.slug
        Gift.find({category: slug}).lean()
            .then(data => res.render('category', {data}))
    }
}

module.exports = new CategoryController