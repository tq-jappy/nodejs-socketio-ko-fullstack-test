module.exports = function(app) {

  var appController = require('../app/controllers/app_controller')
    , chatController = require('../app/controllers/chat_controller')
    , usersController = require('../app/controllers/users_controller')
    , fooController = require('../app/controllers/foo_controller');

  app.get('/',          appController.index);
  app.get('/chat',      chatController.index);
  app.get('/users',     usersController.index);
  app.get('/foo/:id?',  fooController.index)
};