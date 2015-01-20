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
      message = '<li>' + data.user + ': <a href="' + data.msg + '" target="_blank">' + data.msg + '</a></li>';
  }
  else {
      message = '<li>' + data.user + ': ' + data.msg + '</li>';
  }
  $('#messages').append(message);
});