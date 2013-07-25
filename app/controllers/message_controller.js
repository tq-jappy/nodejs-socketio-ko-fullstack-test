exports.messageController = function(app) {
  var sio = app.get('sio');
  return {
    connection: function(socket) {
      console.log ("connected");
      sio.sockets.emit('enter', socket.id);

      socket.on('msg send', function(msg) {
        socket.emit('msg push', msg);

        // send all clients.
        sio.sockets.emit("msg push", "all -> " + msg);
        // send other clients.
        socket.broadcast.emit('msg push', "others -> " + msg);
      });

      socket.on('disconnect', function() {
        socket.broadcast.emit('leave', socket.id);
      });
    }
  };
};
