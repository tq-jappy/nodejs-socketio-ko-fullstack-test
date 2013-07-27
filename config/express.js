var express = require('express')
  , partials = require('express-partials')
  , path = require('path');

/**
 *
 */
module.exports = function(app, config) {

  app.use(partials());

  // all environments
  app.set('port', config.server.port);
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

  // development only
  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }
};