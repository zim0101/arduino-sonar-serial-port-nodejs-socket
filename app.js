var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');





var app = express();
let hardware = require('./port-config/config');
var server = app.listen(3006, () => { //Start the server, listening on port 4000.
    console.log("Listening to requests on port 3006...");
    console.log('Hardware connected on port : ', hardware.config.port);
});

var io = require('socket.io')(server); //Bind socket.io to our express server.

app.use(express.static('public')); //Send index.html page on GET /


// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

io.on('connection', (socket) => {
    console.log("socketConnectionStatus: *********Someone connected*********"); //show a log as a new client connects.



    socket.on('start', (data) => {
        console.log("port communication has been started");
        const SerialPort = require('serialport');
        const Readline = SerialPort.parsers.Readline;
        const port = new SerialPort(hardware.config.port); //Connect serial port to port COM3. Because my Arduino Board is connected on port COM3. See yours on Arduino IDE -> Tools -> Port
        const parser = port.pipe(new Readline({delimiter: '\r\n'})); //Read the line only when new line comes.
        parser.on('data', (data) => {
            io.sockets.emit('data', data); //emit the datd i.e. {date, time, temp} to all the connected clients.
        });
    });

    socket.on('stop', (data) => {
        console.log("port communication has been destroyed !!!!");
        const SerialPort = require('serialport');
        // const Readline = SerialPort.parsers.Readline;
        const port = new SerialPort(hardware.config.port);
        port.close( (err) => {
            console.log(err);
        });
        // const callback = () => {
        //     console.log("callback!!!!!!!!");
        // };
        // io.sockets.removeListener('start', callback);
    });
});



module.exports = app;



