var socket = io();
var pattern = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);

var name = getCookie('username');
socket.emit('name addition', name);
$('.you .name').append(name);
$('.menu').show();
$('#name').hide();
$('#msg').show();

$('#name').submit(function(){
  var name = $('#n').val();
  return false;
});

$('#msg').submit(function(){
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});

socket.on('chat message', function(data){
  var message = data.msg;

  message = message.replace(pattern, function (value) {
    return '<a href="{0}" target="_blank">{0}</a>'.format(value);
  });

  message = '<li><span class="nr">#{0}</span><span class="who">{1}:</span><span>{2}</span><span class="time">{3}</span></li>'.format(data.id, data.user, message, data.time);

  $('#messages').prepend(message);
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