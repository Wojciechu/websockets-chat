var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var _ = require('lodash')();

app.get('/', function(req, res){
  res.sendfile('public/index.html');
});

io.on('connection', function(socket){

  var user = 'default user';

  socket.on('name addition', function(name){
    user = name;
    io.emit('chat message', name + ' joined chat');
  });
  
  console.log('a user connected');
  socket.on('chat message', function(msg){
    io.emit('chat message', user + ':  ' + msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(8000, function(){
  console.log('listening on *:8000');
});