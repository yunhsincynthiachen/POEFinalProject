socket.on('data', function (data) {
	var box = document.getElementById('step' + data);

	box.style.backgroundColor = 'black';
	step = data;
});
