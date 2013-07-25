var assert = require('assert')
  , greet = require('../lib/greet');

describe('greet', function() {
  describe('greet', function() {
    it('returns greet message', function() {
      assert.equal(greet.greet('hoge'), 'Hello, hoge');
    });
  });
});