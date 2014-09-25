var socket = io();

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

socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(msg));
});