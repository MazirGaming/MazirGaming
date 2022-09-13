const { $where } = require('../models/Gift')
const Gift = require('../models/Gift')
const passport = require("passport");



class SiteController {
    //GET /

    index(req, res, next) {
        var totalPage
        var search = req.query.search
        var sort = req.query.sort
        var page = req.query.page || 1
        const PAGE_SIZE = 8
        if (page) {
            page = parseInt(page)
            // if (page < 0) {
            //     page = 1
            // }
            var start = (page - 1) * PAGE_SIZE
            Gift.find({}).lean()
                .sort(sort)
                .skip(start)
                .limit(PAGE_SIZE)
                .then(gifts => {
                    Gift.countDocuments({}).then((total) => {
                        var totalPage = Math.ceil(total / PAGE_SIZE)
                        res.render('home', {
                            gifts: gifts,
                            totalPage: totalPage
                        })
                    })
                })
                .catch(err => {
                    res.status(500).json('loi server2')
                })
        } 
        // else {
        //     Gift.find({}).lean()
        //         .sort(sort)

        //         .skip(0)
        //         .limit(PAGE_SIZE)
        //         .then(gifts => {
        //             Gift.countDocuments({}).then((total) => {
        //                 var totalPage = Math.ceil(total / PAGE_SIZE)
        //                 res.render('home', {
        //                     gifts: gifts,
        //                     totalPage: totalPage
        //                 })
        //             })
        //         })
        //         .catch(err => {
        //             res.status(500).json('loi server1')
        //         })
        // }
    }
    search(req, res, next) {
        var totalPage
        var search = req.query.search
        console.log(search)
        var sort = req.query.sort 
        var page = req.query.page || 1
        const PAGE_SIZE = 8
        if (page) {
            page = parseInt(page)
            // if (page < 0) {
            //     page = 1
            // }
            var start = (page - 1) * PAGE_SIZE
            if (search) {
                Gift.find({ $text: { $search: search }}).lean()
                    .sort(sort)
                    .skip(start)
                    .limit(PAGE_SIZE)
                    .then(gifts => {
                        Gift.countDocuments({}).then((total) => {
                            var totalPage = Math.ceil(total / PAGE_SIZE)
                            res.render('home', {
                                gifts: gifts,
                                totalPage: totalPage    
                            })
                        })
                    })
                    .catch(err => {
                        res.render('home',{mess: 'không có sản phẩm'})

                    })
            } else {
                res.render('home',{mess: 'không có sản phẩm'})
                
            }
        }
        // else {
        //     if(search){
        //         Gift.find({ $text: { $search: search } }).lean()
        //         .sort(sort)
        //         .skip(0)
        //         .limit(PAGE_SIZE)
        //         .then(gifts => {
        //             Gift.countDocuments({}).then((total) => {
        //                 var totalPage = Math.ceil(total / PAGE_SIZE)
        //                 res.render('home', {
        //                     gifts: gifts,
        //                     totalPage: totalPage,
        //                     mess: 'không có sản phẩm'
        //                 })
        //             })
        //         })
        //         .catch(err => {
        //             res.render('home',{mess: 'không có sản phẩm'})

        //         })
        //     } else{
        //         res.render('home',{mess: 'không có sản phẩm'})
        //     }
           
        // }
    }

}



module.exports = new SiteController;