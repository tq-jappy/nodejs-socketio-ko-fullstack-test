should = require 'should'
controller = require '../../app/controllers/app_controller'

describe "app_controllers", ->
  beforeEach =>
    console.log("beforeEach")
    @app = {}
    @req = {}
    @res =
      redirect: ->
      render: ->
    controller = controller.appController(@app)

  describe "index", =>
    console.log("runTest")
    it "should display index page with title", (done) =>
      @res.render = (view, vars) ->
        view.should.equal "index"
        vars.title.should.eql "Express"
        done()

      controller.index(@req, @res)

  return
