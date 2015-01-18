io.on('connection', function(socket) {

  var user = 'some user';

  socket.on('name addition', function(name) {
    user = name;
    io.emit('chat message', name + ' joined chat');
  });
  
  socket.on('chat message', function(msg) {
    io.emit('chat message', user + ':  ' + msg);
  });

  socket.on('disconnect', function() {
    io.emit('chat message', user + ' left chat');
  });

});