require 'should'
io = require 'socket.io-client'
url = 'http://localhost:3000/'
options =
  'force new connection': true

describe "socket_controller", ->
  describe "one member", =>
    it "should display index page with title", (done) =>
      client = io.connect(url)

      client.on 'connect', ->
        client.emit('post_message', {message: 'hello'})

        client.on 'chat_message', (data) ->
          data.message.should.equal 'hello'
          client.disconnect()
          done()

  describe "two members", =>
    it "should display index page with title", (done) =>
      client1 = io.connect(url, options)
      client2 = null

      # 期待するメッセージを全てクライアントが受信できたかをチェックする関数
      # "受信者名(1/2):送信者名(A/B):受信メッセージ"
      checks = ["1:A:hello", "1:B:good-morning", "2:B:good-morning"]
      isDone = (client, data) ->
        check = client + ":" + data.name + ":" + data.message
        checks = checks.filter (word) -> word isnt check
        if checks.length is 0 then true else false

      client1.on 'connect', ->
        client1.emit('post_message', {name: 'A', message: 'hello'})

        client2 = io.connect(url, options)

        client2.on 'connect', ->
          client2.emit('post_message', {name: 'B', message: 'good-morning'})

          client2.on 'chat_message', (data) ->
            if (isDone('2', data))
              client1.disconnect()
              client2.disconnect()
              done()

        client1.on 'chat_message', (data) ->
          if (isDone('1', data))
              client1.disconnect()
              client2.disconnect()
              done()