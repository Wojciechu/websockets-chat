io.on('connection', function(socket) {

  var counter = 0;
  var user = 'some user';

  socket.on('name addition', function(name) {
    user = name;
    io.emit('chat message', { user: 'Server', msg: user + ' joined chat', time: moment().calendar() });
  });
  
  socket.on('chat message', function(msg) {
    counter = counter + 1;
    io.emit('chat message', { id: counter, user: user, msg: msg, time: moment().calendar() });
  });

  socket.on('disconnect', function() {
    io.emit('chat message', { user: 'Server', msg: user + ' left chat', time: moment().calendar() });
  });

});
