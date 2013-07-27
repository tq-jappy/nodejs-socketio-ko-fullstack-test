/**
 *
 */
exports.index = function(req, res) {
  res.render('chat/index', {
    resources: [
      { type: 'javascript', uri: '/socket.io/socket.io.js' },
      { type: 'javascript', uri: '/javascripts/chat.js' }
    ]
  });
};
