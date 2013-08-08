should = require 'should'
controller = require '../../app/controllers/users_controller'

describe "users_controller", ->
  beforeEach =>
    console.log("beforeEach")
    @app = {}
    @req =
      param: ->
    @res =
      redirect: ->
      render: ->

  describe "index", =>
    it "should display users/index page", (done) =>
      @res.render = (view, vars) ->
        view.should.equal "users/index"
        vars.users.length.should.eql 5
        done()
      controller.index(@req, @res)

  describe "new", =>
    it "should display users/new page", (done) =>
      @res.render = (view, vars) ->
        view.should.equal "users/new"
        vars.user.name.should.eql ''
        vars.user.age.should.eql ''
        done()
      controller.new(@req, @res)

  describe "create", =>
    it "should add new user and redirect users page", (done) =>
      @req.param = (key) ->
        {name: 'aaa', age: 10}[key]
      @res.redirect = (view) ->
        view.should.equal "/users"
        controller.users[6].name.should.eql 'aaa'
        controller.users[6].age.should.eql 10
        done()
      controller.create(@req, @res)

  describe "edit", =>
    it "should display users/edit page", (done) =>
      @req.param = (id) -> 3
      @res.render = (view, vars) ->
        view.should.equal "users/edit"
        vars.user.name.should.eql 'Jones'
        vars.user.age.should.eql 17
        done()
      controller.edit(@req, @res)

  describe "update", =>
    it "should update existing user and redirect users page", (done) =>
      @req.param = (key) ->
        {id: 3, name: 'xxx', age: 15}[key]
      @res.redirect = (view) ->
        view.should.equal "/users"
        controller.users[3].name.should.eql 'xxx'
        controller.users[3].age.should.eql 15
        done()
      controller.update(@req, @res)

  describe "destroy", =>
    it "should remove existing user and redirect users page", (done) =>
      @req.param = (key) -> 4
      @res.redirect = (view) ->
        view.should.equal "/users"
        should.not.exist(controller.users[4]);
        done()
      controller.destroy(@req, @res)

  return
