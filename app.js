var motd = 'oi, fuk u m8';

var app = require('http').createServer(handler)
   , io = require('socket.io').listen(app)
   , fs = require('fs')

app.listen(85);

function handler (req, res)
{
  fs.readFile(__dirname + '/index.html', function (err, data) 
  {
    if (err) 
    {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) 
{
  socket.emit('news', { message: motd });

  socket.on('roll_request', function (data)
  {
    var detail_string = "(";
    var roll_amount = 0;

    for(var c = 0; c < data.multiplier; c++)
    {
      var current_roll = getRandomInt(1, data.faces);
      roll_amount += current_roll;
      if(c != 0) detail_string += " + " + current_roll;
      else detail_string += current_roll;
    }

    detail_string += ") " + (data.modifier >= 0 ? " + " : " - ") + Math.abs(data.modifier);

    roll_amount += data.modifier;

    io.sockets.emit('dice_roll', {user: data.username, value: roll_amount, details: detail_string});
  });
});

function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}