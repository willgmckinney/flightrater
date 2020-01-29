let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let User = sequelize.import('../models/user');
let Rating = sequelize.import('../models/rating');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

router.post('/signup', function (req, res) {
    User.create({
        fullname: req.body.fullname,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 13)
    }).then(
        function createSuccess(user){

            let token = jwt.sign({id: user.id}, process.env.JWT, {expiresIn: 60*60*24});

            res.json({
                user: user,
                message: 'created',
                sessionToken: token
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});

router.post('/signin', function(req, res) {

    User.findOne( { where: {username: req.body.username}}).then (
        function(user) {
            if (user) {
                bcrypt.compare(req.body.password, user.password, function(err, matches) {
                    if(matches){
                        let token = jwt.sign({id: user.id}, process.env.JWT, {expiresIn: 60*60*24});
                        res.json({
                            user: user,
                            message: "succesfully authenticated",
                            sessionToken: token
                        });
                    } else {
                        res.status(502).send({error: "Password"})
                    }
                });
            } else {
                res.status(502).send({error: "Username"})
            }
        },
    );
});

router.get('/allposts', function (req, res) {
    Rating.findAll({
        attributes: ['id', 'airline', 'date', 'rating', 'reason']
    }).then(
        function findAllSuccess(data) {
            res.json(data);
        },
        function findAllError(err) {
            res.send(500, err.message);
        }
    );
});


module.exports = router;