var stepOrderSet= ["left", "down", "up", "right"];
var map = {1: false, 2: false, 3: false, 4: false};

var stepKey = {"left":1, "up":3, "down":2, "right":4};
var stepReverseKey = {1:"left", 3:"up", 2:"down", 4:"right"};

var stepOrder = ["left", "down", "down", "down", "left", "left"];
var stepNum = 0;
var myVar = '<div class="col-md-3 moving '+stepOrder[stepNum]+'" id="'+stepOrder[stepNum]+'"></div>';
var rowDiv = $('#row-moving');
rowDiv.append(myVar);

var shuttle1 = $('.'+stepOrder[stepNum]);

socket.on('data', function (data) {
	console.log(data);
	for (var j = 1; j < data.toString().length; j++) {
		if (data.toString().charAt(j) == 1) {
			map[j] = true;
			console.log(stepOrderSet[j-1]);
			$('#' + stepOrderSet[j-1]).css({"backgroundColor": "black"});
		} else {
			map[j] = false;
			$('#' + stepOrderSet[j-1]).css({"backgroundColor": "#800080"});
		}
	}
	step = data;
});

var complete = function () {
	if (map[stepKey[stepOrder[stepNum]]]) {
		$("#score").text(parseInt($("#score").text()) + 100);
		$('#scoreChange').text('+100').css({'color':'green'});
	} else {
		$("#score").text(parseInt($("#score").text()) - 100);
		$('#scoreChange').text('-100').css({'color':'red'});
	}

	stepNum++;
	var myVar2 = '<div class="col-md-3 moving '+stepOrder[stepNum]+'" id="'+stepOrder[stepNum]+'"></div>';
	rowDiv.append(myVar2);
	var shuttle1 = $('.'+stepOrder[stepNum]);

	if (stepNum == stepOrder.length) {
		var moving_arrow = TweenLite.to(shuttle1, 1, {
			y: "-425px",
			ease: Linear.easeNone,
		});
	} else {
		var moving_arrow = TweenLite.to(shuttle1, 1, {
			y: "-425px",
			ease: Linear.easeNone,
			onComplete: complete,
		});
	}
};

var moving_arrow = TweenLite.to(shuttle1, 1, {
  y: "-425px",
  ease: Linear.easeNone,
	onComplete: complete,
});

// $(document).keydown(function(e) {
//     if (e.keyCode in map) {
//         map[e.keyCode] = true;
// 				$('#' + stepReverseKey[e.keyCode]).css({"backgroundColor": "black"});
//     }
// }).keyup(function(e) {
//     if (e.keyCode in map) {
//         map[e.keyCode] = false;
// 				$('#' + stepReverseKey[e.keyCode]).css({"backgroundColor": "#800080"});
//     }
// });
