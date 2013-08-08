var assert = require('assert')
  , greet = require('../../lib/greet');

describe('greet', function() {
  describe('greet', function() {
    it('returns greet message', function() {
      assert.equal(greet.greet('hoge'), 'Hello, hoge');
    });
  });

  describe('greetAsync', function() {
    it('returns greet message in callback', function(done) {
      greet.greetAsync('fuga', function(msg) {
        assert.equal(msg, 'Hello, fuga');
        done();
      });
    });
  });
});