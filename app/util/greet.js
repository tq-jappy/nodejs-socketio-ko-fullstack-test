exports.greet = function(name) {
  return "Hello, " + name;
}

exports.greetAsync = function(name, callback) {
  var msg = "Hello, " + name;
  callback(msg);
}