var express = require('express');
var router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/monitor', function (req, res, next) {
  res.sendFile(path.join('/home/wasim/HardwareWithJS/AvrSocket/arduino-app/index.html'));
});

module.exports = router;



