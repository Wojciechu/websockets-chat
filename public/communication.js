var socket = io();
var pattern = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);

$('#name').submit(function(){
  socket.emit('name addition', $('#n').val());
  $('#name').hide();
  $('#msg').show();
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