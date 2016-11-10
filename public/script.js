var stepOrderSet= ["left", "down", "up", "right"];
var map = {37: false, 38: false, 40: false, 39: false};

var stepKey = {"left":37, "up":38, "down":40, "right":39};
var stepReverseKey = {37:"left", 38:"up", 40:"down", 39:"right"};

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
			map[j+36] = true;
			console.log(stepOrderSet[j-1]);
			$('#' + stepOrderSet[j-1]).css({"backgroundColor": "black"});
		} else {
			map[j+36] = false;
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
