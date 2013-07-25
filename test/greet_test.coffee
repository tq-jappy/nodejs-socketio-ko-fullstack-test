assert = require 'assert'
greet = require '../lib/greet'

describe 'greet', ->
  describe 'greet', ->
    it 'returns greet message', ->
      assert.equal greet.greet('hoge'), 'Hello, hoge'

  describe 'greetAsync', ->
    it 'returns greet message in callback', (done) ->
      greet.greetAsync 'fuga', (msg) ->
        assert.equal msg, 'Hello, fuga'
        done()