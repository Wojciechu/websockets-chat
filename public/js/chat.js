(function () {
  'use-strict';
  
  var socket = io();
  var urlPattern = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  var name = $('.name').attr('data-username');
  
  socket.emit('name addition', name);

  $('.send-box').submit(function () {
    var $message = $('.send-box input');
    socket.emit('chat message', $message.val());
    $message.val('');
    return false;
  });

  socket.on('chat message', function (data) {
    var message = data.msg;

    message = message.replace(urlPattern, function (value) {
      return '<a href="{0}" target="_blank">{0}</a>'.format(value);
    });

    message = '<li><span class="nr">#{0}</span><span class="who">{1}:</span><span>{2}</span><span class="time">{3}</span></li>'.format(data.id, data.user, message, data.time);

    $('.messages').prepend(message);
  });

  socket.on('registered-users', function (users) {
    var $users = $('.users-list');
    var $count = $('.count');

    $count.empty();
    $count.append(users.length);

    $users.empty();
    _.forEach(users, function (value) {
      $users.append('<li>{0}</li>'.format(value));
    });
  });
})();