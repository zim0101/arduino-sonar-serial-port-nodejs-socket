let express = require('express');
let router = express.Router();
const path = require('path');
const hardware = require('./../port-config/config');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/monitor', function (req, res, next) {
  res.sendFile(path.join('/home/wasim/HardwareWithJS/AvrSocket/arduino-app/index.html'));
});

router.get('/save-port-params', function (req, res) {
  console.log(req.query.port, req.query.baudrate);
  hardware.config.port = req.query.port;
  hardware.config.baudrate= req.query.baudrate;
  console.log(hardware.config.port, hardware.config.baudrate);
  res.redirect('/');
});


module.exports = router;



