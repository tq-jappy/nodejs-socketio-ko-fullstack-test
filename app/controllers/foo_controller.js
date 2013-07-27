/**
 *
 */
exports.index = function(req, res) {
  var foo = req.param('id') || '*';
  res.render('foo/index',
    {
      title: 'Express',
      foo: foo
    }
  );
};