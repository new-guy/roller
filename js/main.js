var g_username = "default";

var socket = io.connect('http://25.145.68.192:85');
socket.on('news', function (data) 
{
	console.log(data);
	socket.emit('my other event', { my: 'data' });
});

socket.on('button_response', function (data)
{
	console.log(data);

	var html = "<p>"
	html += "User " + data.user + " pressed a button!  Holy shit!";
	html += "</p>";

	$("#messagecontainer").prepend(html);
});

function sendPressEvent()
{
	socket.emit('button', {username: g_username});
}

function setUsername()
{
	g_username = $("#username").val();
	console.log("Username: " + g_username);
}