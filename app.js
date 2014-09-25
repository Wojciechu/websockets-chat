var express  = require('express');
var app = express();
var http = require('http').createServer(app);
var io   = require('socket.io')(http);
var _    = require('lodash')();
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendfile('public/index.html');
});

io.on('connection', function(socket){

  var user = 'some user';

  socket.on('name addition', function(name){
    user = name;
    io.emit('chat message', name + ' joined chat');
  });
  
  socket.on('chat message', function(msg){
    io.emit('chat message', user + ':  ' + msg);
  });

  socket.on('disconnect', function(){
    io.emit('chat message', user + ' left chat');
  });

});

var port = Number(process.env.PORT || 5000);
http.listen(port, function(){
  console.log('listening on ' + port);
});