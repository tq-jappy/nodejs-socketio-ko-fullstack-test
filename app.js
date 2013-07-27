
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , config = require('./config/config')['development'];

var app = express();

require('./config/express')(app, config);

require('./config/routes')(app);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var sio = require('socket.io').listen(server);
app.set('sio', sio);

var  messageController = require('./app/controllers/socket_controller').messageController(app);
sio.sockets.on('connection', messageController.connection);

exports = module.exports = app;