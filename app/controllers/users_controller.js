var users = {
  1: { id: 1, name: 'Allen', age: 21 },
  2: { id: 2, name: 'Ward', age: 23 },
  3: { id: 3, name: 'Jones', age: 17 },
  4: { id: 4, name: 'Martin', age: 20 },
  5: { id: 5, name: 'Blake', age: 29 }
};
var counter = 5;

/**
 *
 */
exports.index = function(req, res) {
  var users_ = []
  for (var id in users) {
    users_.push(users[id]);
  }
  res.render('users/index', { users: users_ });
};

/**
 *
 */
exports.new = function(req, res) {
  res.render('users/new', {user: { name: '', age: '' }});
};

/**
 *
 */
exports.create = function(req, res) {
  console.log("create new user");
  counter++;
  users[counter] = {id: counter, name: req.param('name'), age: req.param('age')};
  res.redirect('/users');
};

/**
 *
 */
exports.edit = function(req, res) {
  res.render('users/edit', {user: users[req.param('id')]});
};

/**
 *
 */
exports.update = function(req, res) {
  console.log("update new user");
  id = req.param('id');
  user = users[id];
  user.name = req.param('name');
  user.age = req.param('age');
  res.redirect('/users');
};

/**
 *
 */
exports.destroy = function(req, res) {
  delete users[req.param('id')];
  res.redirect('/users');
};