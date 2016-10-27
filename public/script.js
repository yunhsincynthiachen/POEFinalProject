socket.on('data', function (data) {
	var box = document.getElementById('step' + String(data).charAt(0));

	if (String(data).charAt(1) == 0) {
		box.style.backgroundColor = 'black';
	} else {
		box.style.backgroundColor = '#800080';
	}
	step = data;
});
