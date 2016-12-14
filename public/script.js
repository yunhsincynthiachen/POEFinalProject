var stepOrderSet= ["left", "down", "up", "right"];
var map = {1: false, 2: false, 3: false, 4: false};

var stepKey = {"left":1, "up":3, "down":2, "right":4};
var stepReverseKey = {1:"left", 3:"up", 2:"down", 4:"right"};

var cantBeTamed = ["right", "right", "up", "up", "left", "left", "right", "right","left","up", "right", "left", "up", "up", "down", "down","right", "right", "up", "up", "left", "left", "right", "right", "up", "up", "left", "left", "right", "right","left","up", "right", "left", "up", "up", "down", "down"];

var justDance = ["none", "left", "left", "right", "right","left","up", "right", "left", "up", "up", "down", "down", "right", "right", "up", "up", "left","right", "right", "up", "up", "left","left", "left", "right", "right","left", "left", "right", "right", "down", "right", "none", "right", "up", "up","down","right", "right", "up","down","right", "right", "up"];

var workFromHome = ["left", "right", "up", "up", "left", "left", "right", "right","left","up", "right", "left", "up", "up", "down", "down","right", "right", "up", "left","left", "left", "right", "right","left", "left", "right", "right", "down", "right", "none", "right", "up", "up","down","right", "right", "up","down","right", "right", "up"];

var start = true;
var playing = false;
var keyboardGame;

var song = (window.location.search).substring(6, (window.location.search).length);

socket.on('keyboardGame', function (data) {
	if (data) {
		$('#whatDevice').text("**Using KEYBOARD to Play");
	} else {
		$('#whatDevice').text("**Using BOARD to Play");
	}
	console.log(data);
	keyboardGame = data;
});

function createGame (stepOrder, isKeyboardGame) {

	var stepNum = 0;
	var myVar = '<div class="col-md-3 moving '+stepOrder[stepNum]+'" id="'+stepOrder[stepNum]+'"></div>';
	var rowDiv = $('#row-moving');
	rowDiv.append(myVar);

	var shuttle1 = $('.'+stepOrder[stepNum]);

	if (isKeyboardGame) {
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
	} else {
		socket.on('data', function (data) {
			console.log(data);
			for (var j = 0; j < data.toString().length; j++) {
				if (data.toString().charAt(j) == 1) {
					map[j+1] = true;
					console.log(stepOrderSet[j]);
					// $('#' + stepOrderSet[j]).css({"backgroundColor": "black"});
					// setTimeout(function(){
					// 	$('#' + stepOrderSet[j]).css({"backgroundColor": "#800080"});
					// 	map[j+1] = false;
					// },200);
				}
			}
			step = data;
		});
	}

	var complete = function () {
		rowDiv.empty();
		var step = stepOrder[stepNum];

		if (step != "none") {
			if (map[stepKey[step]]) {
				$("#score").text(parseInt($("#score").text()) + 100);
				$('#scoreChange').text('+100').css({'color':'#33FF33'});
			} else {
				$("#score").text(parseInt($("#score").text()) - 100);
				$('#scoreChange').text('-100').css({'color':'#FF0000'});
			}
		}

		stepNum++;
		var myVar2 = '<div class="col-md-3 moving '+stepOrder[stepNum]+'" id="'+stepOrder[stepNum]+'"></div>';
		rowDiv.append(myVar2);
		var shuttle1 = $('.'+stepOrder[stepNum]);

		if (stepNum == stepOrder.length) {
			map = {1: false, 2: false, 3: false, 4: false};
			var moving_arrow = TweenMax.to(shuttle1, 4, {
				y: "-425px",
				ease: Linear.easeNone,
			});
			if (!keyboardGame) {
				console.log("SENDING MESSAGE");
				socket.emit('message', stepOrder[stepNum]);
			}
		} else {
			map = {1: false, 2: false, 3: false, 4: false};
			var moving_arrow = TweenMax.to(shuttle1, 4, {
				y: "-425px",
				ease: Linear.easeNone,
				onComplete: complete,
			});
			if (!keyboardGame) {
				console.log("SENDING MESSAGE");
				socket.emit('message', stepOrder[stepNum]);
			}		}
	};

	var moving_arrow = TweenMax.to(shuttle1, 4, {
	  y: "-425px",
	  ease: Linear.easeNone,
		onComplete: complete,
	});
	if (!keyboardGame) {
		console.log("SENDING MESSAGE");
		socket.emit('message', stepOrder[stepNum]);
	}}

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
