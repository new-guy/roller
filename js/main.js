$(document).ready(function(){
	pageInit();
});

function pageInit()
{
	$("input").jvFloat();
}

var socket = io.connect('http://25.145.68.192:85');
socket.on('news', function (data) 
{
	$("#message_container").prepend("<p>Server MOTD: "+data.message+"</p>");
});

socket.on('dice_roll', function (data)
{
	var d = new Date();
	var timeString = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

	var html = "<p>" + timeString  + " || ";
	html += (data.user == "" ? "SET YOUR USERNAME, FUCKER!" : data.user) + " rolled a " + data.value + "  ||  " + data.details;
	html += "</p>";

	$("#message_container").prepend(html);

	if($("#message_container").children("*").length > 20)
	{
		var temp_html = $("#message_container").children("*").slice(0,20);
		$("#message_container").html(temp_html);
	}
});

function sendRollRequest()
{
	var working_username = getUsername();
	var working_multiplier = getMultiplier();
	var working_faces = getFaces();
	var working_modifier = getModifier();

	socket.emit('roll_request', {username: working_username, multiplier: working_multiplier, faces: working_faces, modifier: working_modifier});
}

function getModifier()
{
	return parseInt($("#modifier").val());
}

function getFaces()
{
	return parseInt($("#faces").val());
}

function getMultiplier()
{
	return parseInt($("#multiplier").val());
}

function getUsername()
{
	return $("#username").val();
}