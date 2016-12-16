var http = require('http');
var express = require('express');
var app = express();
var serialPort = require("serialport");
var server = http.createServer(app).listen(process.env.PORT || 3000);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));

//Initialize global variables for usingKeyboard boolean and serialport setup
var usingKeyboard = false;
var serialport;

//Dictionary for all of the different arrow keys messages that will get sent to the arduino
var keyDict = {
  "left" : "11000\n",
  "down" : "10100\n",
  "up" : "10010\n",
  "right" : "10001\n",
  "none" : "10000\n",
  "null" : "10000\n"
}

//When socket is connected
io.sockets.on('connection', function (socket) {
  //Connecting to client
  console.log('Socket connected');
  socket.on('changeSerialPort', function (deviceName) {
    //If serialport has already been opened before, close it
    if (serialport) {
      serialport.close(function (err) {
          console.log('port closed', err);
      });
    }

    //If deviceName is not equal to null, create new serialport based on the device name
    if (deviceName !== null) {
      serialport = new serialPort(deviceName,
      {
        parser: serialPort.parsers.readline("\n") //parser to make sure string name can be accepted
      },function(error) {
       if(error == "[Error: Error Resource temporarily unavailable Cannot lock port]") //If not due to the absence of a port, use keyboard
        {
          usingKeyboard = true;
          socketConnection();
        } else { //If there is a different error, don't use keyboard because it's a serialport issue
          usingKeyboard = false;
          socketConnection();
        }
      });
      usingKeyboard = false;
      socketConnection();
    }
  });
})

/*socketConnection: takes no inputs, but emits socket messages depending on whether or not the player is using the keyboard or the real board*/
function socketConnection() {
  if (usingKeyboard) { //if player is using keyboard, sends info that it is a keyboard game to the front-end
    console.log("using Keyboard");
    io.sockets.on('connection', function (socket) {
      //Connecting to client
      console.log('Socket connected');
      socket.emit('connected');
      socket.emit('keyboardGame', true);
    })
  } else { //else player is using mechanical board
    console.log("using board");
    serialport.on('open', function(){ //open serialport and send data to front-end if data is received from the arduino
    	// Now server is connected to Arduino
    	console.log('Serial Port Opened');

    	var lastValue;
    	io.sockets.on('connection', function (socket) {
    		//Connecting to client
    		console.log('Socket connected');
    		socket.emit('connected');
        socket.emit('keyboardGame', false); //send info that this is not a keyboard game to front-end
    		var lastValue;

    		serialport.on('data', function(data){ //send socket data
          console.log(data);
    			var step = data;
    			socket.emit('data', step);
    			lastValue = step;
    		});

        socket.on('message', function (recievedData) { //write to serialport if front-end sends message about the next step
          if (recievedData !== "null") {
            serialport.write(keyDict[recievedData]);
          }
        });
    	});
    });
  }
}
