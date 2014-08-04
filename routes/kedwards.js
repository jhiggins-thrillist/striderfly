/**
 * Kyle Edwards's route
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('kedwards/index');
});

module.exports = router;
