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
    var roll_amount = getRandomInt(1, 6);

    io.sockets.emit('dice_roll', {user: data.username, value: roll_amount});
  });
});

function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}