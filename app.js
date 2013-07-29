
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

var io = require('socket.io').listen(server);

var socketController = require('./app/controllers/socket_controller')(app, io);
io.sockets.on('connection', socketController.connection);

exports = module.exports = app;