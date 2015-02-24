module.exports = function (http) {
  var io = require('socket.io')(http);

  var users = {};
  var counter = 0;
  /**
   * Event called when new user connects to websocket
   * @param  {Object} socket  Socket data
   */
  io.on('connection', function (socket) {

    var username = 'some user';
    users[socket.id] = username;
    
    if (_.size(users) === 1) {
      counter = 0;
    }

    /**
     * Called when user adds name
     * @param  {String} name User name
     */
    socket.on('name-addition', function (name) {
      username = sanitizer.sanitize(name);
      users[socket.id] = username;
      io.emit('registered-users', _.values(users));
      io.emit('chat-message', { user: 'Server', msg: username + ' joined chat', time: moment().calendar() });
    });
    
    /**
     * Called whe user submits data
     * @param  {String} msg   Message content
     */
    socket.on('chat-message', function (msg) {
      var message = sanitizer.sanitize(msg);
      if (message){
        counter = counter + 1;
        io.emit('chat-message', { id: counter, user: username, msg: message, time: moment().calendar() });
      }
    });

    /**
     * Called when user disconnects
     */
    socket.on('disconnect', function () {
      delete users[socket.id];
      io.emit('registered-users', _.values(users));
      io.emit('chat-message', { user: 'Server', msg: username + ' left chat', time: moment().calendar() });
    });
  });
};


