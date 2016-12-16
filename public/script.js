var stepOrderSet= ["left", "down", "up", "right"]; //step order
var map = {1: false, 2: false, 3: false, 4: false}; //initial mapping of what has been stepped on

var stepKey = {"left":1, "up":3, "down":2, "right":4}; //corresponding step to number

//steps for cantBeTamed by Miley Cyrus
var cantBeTamed = ["right", "right", "up", "up", "left", "left", "right", "right","left","up", "right", "left", "up", "up", "down", "down","right", "right", "up", "up", "left", "left", "right", "right", "up", "up", "left", "left", "right", "right","left","up", "right", "left", "up", "up", "down", "down"];

//steps for justDance by Lady Gaga
var justDance = ["none", "left", "left", "right", "right","left","up", "right", "left", "up", "up", "down", "down", "right", "right", "up", "up", "left","right", "right", "up", "up", "left","left", "left", "right", "right","left", "left", "right", "right", "down", "right", "none", "right", "up", "up","down","right", "right", "up","down","right", "right", "up"];

//steps for workFromHome by Fifth Harmony
var workFromHome = ["left", "right", "up", "up", "left", "left", "right", "right","left","up", "right", "left", "up", "up", "down", "down","right", "right", "up", "left","left", "left", "right", "right","left", "left", "right", "right", "down", "right", "none", "right", "up", "up","down","right", "right", "up","down","right", "right", "up"];

//Set defaults to variables
var start = true;
var playing = false;
var keyboardGame;

//Get the song name from the url
var song = (window.location.search).substring(6, (window.location.search).length);

//Gets whether or not the game should be played with keyboard from the socket
socket.on('keyboardGame', function (data) {
	//set text in header to say whether or not it is the keyboard or mechanical board being used
	if (data) {
		$('#whatDevice').text("**Using KEYBOARD to Play");
	} else {
		$('#whatDevice').text("**Using BOARD to Play");
	}
	console.log(data);
	keyboardGame = data; //set the boolean of keyboardGame to correspond to data
});


/*createGame function takes the stepOrder (game steps) and whether or not the game should be a keyBoardGame to create animations and send info to the backend*/
function createGame (stepOrder, isKeyboardGame) {

	var stepNum = 0; //Initial first stepNumber
	var myVar = '<div class="col-md-3 moving '+stepOrder[stepNum]+'" id="'+stepOrder[stepNum]+'"></div>'; //the div that will be created and moved in animation
	var rowDiv = $('#row-moving');
	rowDiv.append(myVar); //append the div to the whole animation div

	var shuttle1 = $('.'+stepOrder[stepNum]);

	if (isKeyboardGame) { //if it is a keyboard game, we wait for keydown of the different arrow keys and set the css for that particular div for a brief moment, indicating that it is being stepped on, and then switch to false
		console.log("KEYBOARDGAME");
		$(document).keydown(function(e) {
	    switch(e.which) {
	        case 37: // left
						map[1] = true;
						$('#left').css({"backgroundColor": "black"});
						setTimeout(function(){
							$('#left').css({"backgroundColor": "#800080"});
							map[1] = false;
						},1000);
	        	break;
	        case 38: // up
						map[3] = true;
						$('#up').css({"backgroundColor": "black"});
						setTimeout(function(){
							$('#up').css({"backgroundColor": "#800080"});
							map[3] = false;
						},1000);
	        	break;
	        case 39: // right
						map[4] = true;
						$('#right').css({"backgroundColor": "black"});
						setTimeout(function(){
							$('#right').css({"backgroundColor": "#800080"});
							map[4] = false;
						},1000);
						break;
	        case 40: // down
						map[2] = true;
						$('#down').css({"backgroundColor": "black"});
						setTimeout(function(){
							$('#down').css({"backgroundColor": "#800080"});
							map[4] = false;
						},1000);
						break;
	        default: return; // exit this handler for other keys
	    }
    	e.preventDefault(); // prevent the default action (scroll / move caret)
		});
	} else { //if using mechanical board, set the mapping to false or true
		socket.on('data', function (data) {
			console.log(data);
			for (var j = 0; j < data.toString().length; j++) {
				if (data.toString().charAt(j) == 1) {
					map[j+1] = true;
				}
			}
			step = data;
		});
	}

	//complete function makes the rowDiv empty and the changes the score, depending on if the mapping and right key is stepped on
	var complete = function () {
		rowDiv.empty();
		var step = stepOrder[stepNum];

		if (step != "none") { //as long as it's not the last step, calculate the scire
			if (map[stepKey[step]]) {
				$("#score").text(parseInt($("#score").text()) + 100);
				$('#scoreChange').text('+100').css({'color':'#33FF33'});
			} else {
				$("#score").text(parseInt($("#score").text()) - 100);
				$('#scoreChange').text('-100').css({'color':'#FF0000'});
			}
		}

		stepNum++; //increment step

		//do the recreation of the moving div:
		var myVar2 = '<div class="col-md-3 moving '+stepOrder[stepNum]+'" id="'+stepOrder[stepNum]+'"></div>';
		rowDiv.append(myVar2);
		var shuttle1 = $('.'+stepOrder[stepNum]);

		if (stepNum == stepOrder.length) { //if on the last step
			map = {1: false, 2: false, 3: false, 4: false}; //always reset map
			var moving_arrow = TweenMax.to(shuttle1, 4, { //create moving arraow
				y: "-425px",
				ease: Linear.easeNone,
			});
			if (!keyboardGame) { //send the info of what step should be stepped on
				console.log("SENDING MESSAGE");
				socket.emit('message', stepOrder[stepNum]);
			}
		} else { //if not on the last step
			map = {1: false, 2: false, 3: false, 4: false}; //reset map
			var moving_arrow = TweenMax.to(shuttle1, 4, { //create moving arrow, but have onComplete to indicate that another arrow is going to follow
				y: "-425px",
				ease: Linear.easeNone,
				onComplete: complete,
			});
			if (!keyboardGame) {
				console.log("SENDING MESSAGE");
				socket.emit('message', stepOrder[stepNum]);
			} //send info about what step should be stepped on
		}
	};

//init:
var moving_arrow = TweenMax.to(shuttle1, 4, { //THE FIRST MOVING ARROW
  y: "-425px",
  ease: Linear.easeNone,
	onComplete: complete,
});

if (!keyboardGame) {
	console.log("SENDING MESSAGE");
	socket.emit('message', stepOrder[stepNum]);
}}

//PAUSE/PAY Functionality: detects if the first space bar hit is creating the game, and all subsequent space bar presses will only play or pause music and animation
$(document).keydown(function(e) {
    if (e.keyCode == 32) {
			if (playing && start) {
				$(".playpause").fadeOut();
				$(".player-audio-" + song).trigger("play");
				createGame(window[song], keyboardGame);
				start = false;
			} else if (playing && !start){
				$(".playpause").fadeOut();
				TweenMax.resumeAll(true, true);
				$(".player-audio-" + song).trigger("play");
			} else {
				$(".playpause").fadeIn();
				TweenMax.pauseAll(true, true);
				$(".player-audio-" + song).trigger("pause");
			}
    }
		playing = !playing;
})
