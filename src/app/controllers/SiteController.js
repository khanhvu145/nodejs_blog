const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    //[GET]
    index(req, res, next) {
        //Code sử dụng callback
        // Course.find({}, function (err, courses) {
        //     if (!err) {
        //         res.json(courses);
        //     } else {
        //         next(err);
        //     }
        // });

        //Code sử dụng promise
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch(next);

        // res.render('home');
    }

    //[GET]
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
