var box = document.getElementById('step');
socket.on('data', function (data) {
	box.innerHTML = data;
	step = data;
});
