should = require 'should'
controller = require '../../app/controllers/foo_controller'

describe "foo_controller", ->
  beforeEach =>
    console.log("beforeEach")
    @app = {}
    @req =
      param: ->
    @res =
      redirect: ->
      render: ->

  describe "index with id:5", =>
    it "should display index page with title", (done) =>
      @req = {param: (id) -> 5}
      @res.render = (view, vars) ->
        view.should.equal "foo/index"
        vars.foo.should.eql 5
        done()
      controller.index(@req, @res)

  describe "index without id", =>
    it "should display index page with title", (done) =>
      @res.render = (view, vars) ->
        view.should.equal "foo/index"
        vars.foo.should.eql '*'
        done()
      controller.index(@req, @res)

  return
