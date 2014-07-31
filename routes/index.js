var express = require('express');
var _ = require('underscore');
var router = express.Router();
var users = require('../config/users');

/**
 * Homepage
 */
router.get('/', function (req, res) {

    var orderedUsers = _.sortBy(users, function (a, b) {
        return a.contribution < b.contribution;
    });

    res.render('index', {
        users: orderedUsers
    });

});

module.exports = router;
