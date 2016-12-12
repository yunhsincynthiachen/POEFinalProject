var http = require('http');
var express = require('express');
var app = express();
var serialPort = require("serialport");
var server = http.createServer(app).listen(process.env.PORT || 3000);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));

var usingKeyboard = false;

var keyDict = {
  "left" : "11000\n",
  "down" : "10100\n",
  "up" : "10010\n",
  "right" : "10001\n",
  "none" : "10000\n",
  "null" : "10000\n"
}

var serialport = new serialPort("/dev/ttyACM3",
{
  parser: serialPort.parsers.readline("\n")
},function(error) {
 if(error)
  {
    usingKeyboard = true;
    socketConnection();
    console.log(usingKeyboard);
  }
});

function socketConnection() {
  if (usingKeyboard) {
    io.sockets.on('connection', function (socket) {
      //Connecting to client
      console.log('Socket connected');
      socket.emit('connected');
      socket.emit('keyboardGame', true);
    })
  } else {
    serialport.on('open', function(){
    	// Now server is connected to Arduino
    	console.log('Serial Port Opened');

    	var lastValue;
    	io.sockets.on('connection', function (socket) {
    		//Connecting to client
    		console.log('Socket connected');
    		socket.emit('connected');
        socket.emit('keyboardGame', false);
    		var lastValue;

    		serialport.on('data', function(data){
    			var step = data;
    			if(lastValue !== step){
    				socket.emit('data', step);
    			}
    			lastValue = step;
    		});

        socket.on('message', function (recievedData) {
          if (recievedData !== "null") {
            serialport.write(keyDict[recievedData]);
          }
        });

    	});
    });
  }
}
