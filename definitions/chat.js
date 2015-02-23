module.exports = function (http) {
  var io = require('socket.io')(http);

  var users = {};
  var counter = 0;
  /**
   * Event called when new user connects to websocket
   * @param  {Object} socket  Socket data
   */
  io.on('connection', function (socket) {

    var user = 'some user';
    users[socket.id] = user;
    
    if (_.size(users) === 1) {
      counter = 0;
    }

    /**
     * Called when user adds name
     * @param  {String} name User name
     */
    socket.on('name-addition', function (name) {
      user = name;
      users[socket.id] = name;
      io.emit('registered-users', _.values(users));
      io.emit('chat-message', { user: 'Server', msg: user + ' joined chat', time: moment().calendar() });
    });
    
    /**
     * Called whe user submits data
     * @param  {String} msg   Message content
     */
    socket.on('chat-message', function (msg) {
      if (msg){
        counter = counter + 1;
        io.emit('chat-message', { id: counter, user: user, msg: msg, time: moment().calendar() });
      }
    });

    /**
     * Called when user disconnects
     */
    socket.on('disconnect', function () {
      delete users[socket.id];
      io.emit('registered-users', _.values(users));
      io.emit('chat-message', { user: 'Server', msg: user + ' left chat', time: moment().calendar() });
    });
  });
};


