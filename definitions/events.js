io.on('connection', function(socket) {

  var user = 'some user';

  socket.on('name addition', function(name) {
    user = name;
    io.emit('chat message', { user: 'Server', msg: user + ' joined chat' });
  });
  
  socket.on('chat message', function(msg) {
    io.emit('chat message', { user: user, msg: msg });
  });

  socket.on('disconnect', function() {
    io.emit('chat message', { user: 'Server', msg: user + ' left chat' });
  });

});
