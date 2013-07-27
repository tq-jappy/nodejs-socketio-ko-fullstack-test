var users = [
  { name: 'Allen', age: 21 },
  { name: 'Ward', age: 23 },
  { name: 'Jones', age: 17 },
  { name: 'Martin', age: 20 },
  { name: 'Blake', age: 29 }
];
/**
 *
 */
exports.index = function(req, res) {
  res.render('users/index', { users: users });
};
