require 'should'
http = require 'http'
io = require 'socket.io-client'
controller = require('../../app/controllers/socket_controller')

port = 3000
url = "http://localhost:#{port}/"
options =
  'force new connection': true

describe "socket_controller", ->
  before (done) ->
    sio = require('socket.io').listen(port)
    sio.set("log level", 0);

    sio.on('connection', controller({}, sio).connection)
    done()

  after (done) ->
    done()

  describe "one member", =>
    it "should display index page with title", (done) =>
      # console.log "connecting...."
      client = io.connect(url)

      client.on 'connect', ->
        client.emit('post_message', {message: 'hello'})

        client.on 'chat_message', (data) ->
          data.message.should.equal 'hello'
          client.disconnect()
          done()

  describe "two members", =>
    it "should display index page with title", (done) =>
      clientA = io.connect(url, options)
      clientB = null

      check =
        fromA:
          toA: false
        fromB:
          toA: false
          toB: false
        clientAisDone: ->
          if (check.fromA.toA and check.fromB.toA) then true else false
        clientBisDone: ->
          if (check.fromB.toB) then true else false

      clientA.on 'connect', ->
        clientA.emit('post_message', {name: 'A', message: 'hello'})

        clientB = io.connect(url, options)

        clientB.on 'connect', ->
          clientB.emit('post_message', {name: 'B', message: 'good-morning'})

          clientB.on 'chat_message', (data) ->
            if (data.name is 'B' and data.message is 'good-morning')
              check.fromB.toB = true
              # console.log "clientB disconnect"
              clientB.disconnect()
              if (check.clientAisDone())
                done()

        clientA.on 'chat_message', (data) ->
          if (data.name is 'A' and data.message is 'hello')
            check.fromA.toA = true
          else if (data.name is 'B' and data.message is 'good-morning')
            check.fromB.toA = true

          if (check.clientAisDone())
              # console.log "clientA disconnect"
              clientA.disconnect()
              if (check.clientBisDone())
                done()
