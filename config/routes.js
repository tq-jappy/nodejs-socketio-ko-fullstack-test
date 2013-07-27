module.exports = function(app) {

  var appController = require('../app/controllers/app_controller').appController(app)
    , usersController = require('../app/controllers/users_controller').usersController(app);

  app.get('/', appController.index);
  app.get('/users', usersController.index);
};