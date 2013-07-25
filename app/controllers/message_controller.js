exports.messageController = function(app) {
  // var sio = app.get('sio');
  return {
    connection: function(socket) {
      console.log ("connected");
      app.get('sio').sockets.emit('enter', socket.id);

      socket.on('msg send', function(msg) {
        socket.emit('msg push', msg);
        socket.broadcast.emit('msg push', msg);
      });

      socket.on('disconnect', function() {
        socket.broadcast.emit('leave', socket.id);
      });
    }
  };
};
