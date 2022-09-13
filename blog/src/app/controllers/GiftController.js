const Gift = require('../models/Gift')
const Details = require('../models/Details')
const Comment = require('../models/Comment')
const { serializeUser } = require('passport')
class GiftController {

    //GET /gift/:slug
    show(req, res, next) {

        Gift.findOne({ slug: req.params.slug }).lean()
            .populate('details')
            .populate('comments')
            .then(gift => {
                res.render('./gift/show', { gift, user: req.user })
                // res.json(gift)
            })
            .catch(next)
    }
    comments(req, res, next) {
        const comment = new Comment({
            author: req.user.username,
            comment: req.body.comment
        })
        comment.save((err, result)=>{
            if (err){
                console.log(err)
            } else {
                Gift.findOne({ slug: req.params.slug}, (err, data)=>{
                    if (err){
                        console.log(err)
                    } else {
                        data.comments.push(result)
                        data.save()
                        console.log(data.comments)
                        res.redirect('/')
                    }
                    
                })
                
            }
        })
    }
    deleteComment(req, res, next) {
        Comment.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
}

module.exports = new GiftController