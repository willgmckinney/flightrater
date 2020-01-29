let router = require('express').Router();
let sequelize = require('../db');
let Rating = sequelize.import('../models/rating');

router.post('/create', function (req, res) {
    Rating.create({
        airline: req.body.airline,
        date: req.body.date,
        rating: req.body.rating,
        reason: req.body.reason,
        poster: req.user.id
    }).then(
        function createSuccess(postedinfo) {
            res.json({
                postedinfo: postedinfo
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});

router.get('/allposts', function (req, res) {
    Rating.findAll({
        where: {poster: req.user.id}
    }).then(
        function findAllSuccess(data) {
            res.json(data);
        },
        function findAllError(err) {
            res.send(500, err.message);
        }
    );
});

router.delete('/delete/:id', function(req, res) {
    Rating.destroy({
        where: {id: req.params.id, poster: req.user.id}
    }).then(
        function deleteSuccessLog() {
            res.send('you removed a log');
        },
        function deleteLogError(err) {
            res.send(500, err.message);
        }
    );
});

router.put('/update/:id', function (req, res) {
    Rating.update({
        airline: req.body.airline,
        date: req.body.date,
        rating: req.body.rating,
        reason: req.body.reason
    }, {where: {id: req.params.id}})
    .then(
        function updateValid(updatedpost){
        res.json({updatedpost: updatedpost})}
    ).catch(
        function updateInvalid(err) {
        res.send(err)
        }
    )
})


module.exports = router