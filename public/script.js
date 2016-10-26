var dialogue = document.getElementById('dialogue');
var box = document.getElementById('step');
socket.on('connected', function(){
	dialogue.innerHTML = "POE DDR";
});
// socket.on('disconnect', function(){
// 	dialogue.innerHTML = "Socket Disconnected";
// });
socket.on('data', function (data) {
	box.innerHTML = data;
	step = data;
});
