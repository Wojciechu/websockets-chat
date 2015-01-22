var socket = io();
var pattern = new RegExp(/^http(s?):\/\//);

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
  var message;
  if(pattern.test(data.msg)) {
    message = '<li>{0}: <a href="{1}" target="_blank">{1}</a></li>'.format(data.user, data.msg);
  }
  else {
    message = '<li>{0}: {1}</li>'.format(data.user, data.msg);
  }
  $('#messages').append(message);
});