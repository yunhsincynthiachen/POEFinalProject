var stepOrderSet= ["left", "down", "up", "right"];
var map = {1: false, 2: false, 3: false, 4: false};

var stepKey = {"left":1, "up":3, "down":2, "right":4};
var stepReverseKey = {1:"left", 3:"up", 2:"down", 4:"right"};

var cantBeTamed = ["none", "none","right", "none", "right", "up", "none", "up", "none", "left", "none", "left", "none",
										"right", "none", "right"];

var cantBeTamed = ["left", "left", "left", "left", "left", "left", "left", "left", "left", "left", "left", "left", "left"];
var start = true;
var playing = false;

function createGame (stepOrder) {

	var stepNum = 0;
	var myVar = '<div class="col-md-3 moving '+stepOrder[stepNum]+'" id="'+stepOrder[stepNum]+'"></div>';
	var rowDiv = $('#row-moving');
	rowDiv.append(myVar);

	var shuttle1 = $('.'+stepOrder[stepNum]);

	socket.on('data', function (data) {
		console.log(data);
		for (var j = 0; j < data.toString().length; j++) {
			if (data.toString().charAt(j) == 1) {
				map[j+1] = true;
				$('#' + stepOrderSet[j]).css({"backgroundColor": "black"});
			} else {
				map[j+1] = false;
				$('#' + stepOrderSet[j]).css({"backgroundColor": "#800080"});
			}
		}
		step = data;
	});

	var complete = function () {
		rowDiv.empty();
		var step = stepOrder[stepNum];

		if (step != "none") {
			if (map[stepKey[step]]) {
				$("#score").text(parseInt($("#score").text()) + 100);
				$('#scoreChange').text('+100').css({'color':'green'});
			} else {
				$("#score").text(parseInt($("#score").text()) - 100);
				$('#scoreChange').text('-100').css({'color':'red'});
			}
		}

		stepNum++;
		var myVar2 = '<div class="col-md-3 moving '+stepOrder[stepNum]+'" id="'+stepOrder[stepNum]+'"></div>';
		rowDiv.append(myVar2);
		var shuttle1 = $('.'+stepOrder[stepNum]);

		if (stepNum == stepOrder.length) {
			var moving_arrow = TweenMax.to(shuttle1, 3.5, {
				y: "-425px",
				ease: Linear.easeNone,
			});
			socket.emit('message', stepOrder[stepNum]);
		} else {
			var moving_arrow = TweenMax.to(shuttle1, 3.5, {
				y: "-425px",
				ease: Linear.easeNone,
				onComplete: complete,
			});
			socket.emit('message', stepOrder[stepNum]);
		}
	};

	var moving_arrow = TweenMax.to(shuttle1, 3.5, {
	  y: "-425px",
	  ease: Linear.easeNone,
		onComplete: complete,
	});
	socket.emit('message', stepOrder[stepNum]);
}

$(document).keydown(function(e) {
    if (e.keyCode == 32) {
			if (playing && start) {
				$(".playpause").fadeOut();
				$(".player-audio").trigger("play");
				createGame(cantBeTamed);
				start = false;
			} else if (playing && !start){
				$(".playpause").fadeOut();
				TweenMax.resumeAll(true, true);
				$(".player-audio").trigger("play");
			} else {
				$(".playpause").fadeIn();
				TweenMax.pauseAll(true, true);
				$(".player-audio").trigger("pause");
			}
    }
		playing = !playing;
})

// .keyup(function(e) {
//     if (e.keyCode in map) {
//         map[e.keyCode] = false;
// 				$('#' + stepReverseKey[e.keyCode]).css({"backgroundColor": "#800080"});
//     }
// });
