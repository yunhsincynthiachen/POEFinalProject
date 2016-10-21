//importing packages
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');

var SerialPort = require("serialport");
var serialport = new SerialPort("/dev/ttyACM0", {
  baudrate: 9600
});

//setting up our routes
var index = require('./routes/index');
// var resources = require('./routes/resources');
// var metadata = require('./routes/metadata');
//
// mongoose.connect('mongodb://destinychilddatabase:cyndorue@ds035766.mlab.com:35766/destinychild');
// var connection = mongoose.connection;
// connection.on('error', console.error.bind(console, 'connection error:'));
// connection.once('open', function(){
//   console.log('Mongodb Connection Successful');
// });

serialport.on('open', function(){
  console.log('Serial Port Opend');
  serialport.on('data', function(data){
    app.get('/sample', function(req, res) {
        res.send('this is a sample!');
    });
    console.log(data[0]);
  });
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes for Our Backend Models
app.use('/', index);  //renders our handlebars template index.hbs
// app.use('/api/resources', resources);
// app.use('/api/metadata', metadata);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
