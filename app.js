var http = require('http');
var express = require('express');
var app = express();
var serialPort = require("serialport");
var server = http.createServer(app).listen(process.env.PORT || 3000);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));

var keyDict = {
  "left" : 11000,
  "down" : 10100,
  "up" : 10010,
  "right" : 10001,
  "none" : 10000,
  "null" : 10000
}

// io.configure(function () {
//   io.set("transports", ["xhr-polling"]);
//   io.set("polling duration", 10);
// });

var serialport = new serialPort("/dev/ttyACM0", {
    // baudRate: 9600,
    // dataBits: 8,
    // parity: 'none',
    // stopBits: 1,
    // flowControl: false,
    parser: serialPort.parsers.readline("\n")
});

serialport.on('open', function(){
	// Now server is connected to Arduino
	console.log('Serial Port Opened');

	var lastValue;
	io.sockets.on('connection', function (socket) {
		//Connecting to client
		console.log('Socket connected');
		socket.emit('connected');
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
        console.log(keyDict[recievedData]);
      }
    });

	});
});
