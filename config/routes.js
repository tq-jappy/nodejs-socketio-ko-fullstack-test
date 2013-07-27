module.exports = function(app) {

  var appController = require('../app/controllers/app_controller')
    , usersController = require('../app/controllers/users_controller');

  app.get('/',      appController.index);
  app.get('/users', usersController.index);
};