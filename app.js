var http = require('http');
var express = require('express');
var app = express();
var serialPort = require("serialport");
var server = http.createServer(app).listen(3000);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));

var keyDict = {
  "left" : [1, 0, 0, 0],
  "down" : [0, 1, 0, 0],
  "up" : [0, 0, 1, 0],
  "right" : [0, 0, 0, 1],
  "none" : [0, 0, 0, 0],
  "null" : [0, 0, 0, 0]
}

// var serialport = new serialPort("/dev/ttyACM0", {
//     baudRate: 9600,
//     dataBits: 8,
//     parity: 'none',
//     stopBits: 1,
//     flowControl: false,
//     parser: serialPort.parsers.readline("\n")
// });
//
// serialport.on('open', function(){
// 	// Now server is connected to Arduino
// 	console.log('Serial Port Opened');
//
// 	var lastValue;
// 	io.sockets.on('connection', function (socket) {
// 		//Connecting to client
// 		console.log('Socket connected');
// 		socket.emit('connected');
// 		var lastValue;
//
// 		serialport.on('data', function(data){
// 			var step = data;
// 			if(lastValue !== step){
// 				socket.emit('data', step);
// 			}
// 			lastValue = step;
// 		});
//
//     socket.on('message', function (recievedData) {
//       serialport.write(keyDict[recievedData]);
//     });
//
// 	});
// });
