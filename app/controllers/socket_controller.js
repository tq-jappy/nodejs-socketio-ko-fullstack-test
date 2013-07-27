exports.socketController = function(app) {
  var io = app.get('sio')
    , clients = {};
  return {
    connection: function(socket) {
      console.log ("connected");

      socket.on('connect', function(data) {
        clients[socket.id] = data.name;
        io.sockets.emit('entered', data.name);
      });

      socket.on('post_message', function(data) {
        io.sockets.emit("chat_message", data);
      });

      socket.on('disconnect', function() {
        console.log('disconnect');
        var name = clients[socket.id];
        if (name) {
          delete clients[socket.id];
        } else {
          name = '?';
        }
        socket.broadcast.emit('leave', name);
      });
    }
  };
};
