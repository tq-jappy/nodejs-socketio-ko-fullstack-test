var path = require('path')
  , rootPath = path.normalize(__dirname + '/..');

module.exports = {
  development: {
    server: {
      host: 'localhost',
      port: 3000
    },
    root: rootPath
  }
}
