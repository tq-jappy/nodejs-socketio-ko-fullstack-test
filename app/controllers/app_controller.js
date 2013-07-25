exports.appController = function(app) {
  return {
    index: function(req, res) {
      res.render('index', { title: 'Express' });
    }
  };
};
