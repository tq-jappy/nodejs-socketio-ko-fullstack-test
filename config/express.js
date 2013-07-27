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
  app.use(function(req, res, next){
    app.locals.resources = res.locals.resources || [];
    next();
  });
  app.use(app.router);
  app.use(express.static(path.join(config.root, 'public')));

  // development only
  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }
};