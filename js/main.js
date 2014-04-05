var g_username = "default";

var socket = io.connect('http://25.145.68.192:85');
socket.on('news', function (data) 
{
	$("#messagecontainer").prepend("<p>Server MOTD: "+data.message+"</p>");
});

socket.on('dice_roll', function (data)
{
	var html = "<p>"
	html += data.user + " rolled a " + data.value + "!  Holy shit!";
	html += "</p>";

	$("#messagecontainer").prepend(html);
});

function sendRollRequest()
{
	socket.emit('roll_request', {username: g_username});
}

function setUsername()
{
	g_username = $("#username").val();
}