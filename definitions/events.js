var users = {};

io.on('connection', function(socket) {

  var counter = 0;
  var user = 'some user';
  users[socket.id] = user;

  socket.on('name addition', function(name) {
    user = name;
    users[socket.id] = name;
    io.emit('registered-users', _.values(users));
    io.emit('chat message', { user: 'Server', msg: user + ' joined chat', time: moment().calendar() });
  });
  
  socket.on('chat message', function(msg) {
    counter = counter + 1;
    io.emit('chat message', { id: counter, user: user, msg: msg, time: moment().calendar() });
  });

  socket.on('disconnect', function() {
    delete users[socket.id];
    io.emit('registered-users', _.values(users));
    io.emit('chat message', { user: 'Server', msg: user + ' left chat', time: moment().calendar() });
  });

});
