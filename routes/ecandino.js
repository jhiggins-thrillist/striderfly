/**
 * Eric Candino's route
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('ecandino/index');
});

module.exports = router;
