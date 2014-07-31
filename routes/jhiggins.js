/**
 * Joseph Higgins's route
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('jhiggins/index');
});

module.exports = router;
