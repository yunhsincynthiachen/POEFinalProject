var http = require('http');
var express = require('express');
var app = express();
var serialPort = require("serialport");
var server = http.createServer(app).listen(process.env.PORT || 3000);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));

var usingKeyboard = false;
var serialport;

var keyDict = {
  "left" : "11000\n",
  "down" : "10100\n",
  "up" : "10010\n",
  "right" : "10001\n",
  "none" : "10000\n",
  "null" : "10000\n"
}

io.sockets.on('connection', function (socket) {
  //Connecting to client
  if (serialport) {
    console.log(serialport);
    console.log("Serial port already exists");
  } else {
    console.log('Socket connected');
    socket.on('changeSerialPort', function (deviceName) {
      console.log(deviceName);
      if (deviceName !== null) {
        serialport = new serialPort(deviceName,
        {
          parser: serialPort.parsers.readline("\n")
        },function(error) {
         if(error == "[Error: Error Resource temporarily unavailable Cannot lock port]")
          {
            console.log(error);
            usingKeyboard = true;
            socketConnection();
            console.log(usingKeyboard);
          } else {
            console.log("HERE AGAIN");
            usingKeyboard = false;
            socketConnection();
            console.log(usingKeyboard);
            console.log("not using keyboard");
          }
        });

        console.log("HERE AGAIN");
        usingKeyboard = false;
        socketConnection();
        console.log(usingKeyboard);
        console.log("not using keyboard");
      }
    });
  }
})

function socketConnection() {
  if (usingKeyboard) {
    console.log("using Keyboard");
    io.sockets.on('connection', function (socket) {
      //Connecting to client
      console.log('Socket connected');
      socket.emit('connected');
      socket.emit('keyboardGame', true);
    })
  } else {
    console.log("using board");
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
          console.log(data);
    			var step = data;
    			socket.emit('data', step);
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
