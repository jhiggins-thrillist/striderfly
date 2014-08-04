/**
 * Kyle Bales's route
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('kb/index');
});

module.exports = router;
