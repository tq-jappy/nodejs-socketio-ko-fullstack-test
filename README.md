Node.js Simple Application & Testing
================

Simple Chat and CRUD (user management) application using:

- Express
- Socket.IO
- Knockout.js
- mocha (testing)
- should (testing)
- chai (testing)
- phantomjs, mocha-phantomjs (client testing)
- CoffeeScript (only for tests)

## Build

1. ``npm install``
2. ``node app.js``
3. access to ``http://localhost:3000/``

## Test

### Setup

1. ``npm install -g mocha-phantomjs phamtomjs``
2. ``nmp install -g coffee-script``

Mocha options are specified in test/mocha.opts

NODE:: To pass socket_controller_test.coffee, you should run application in advance.

### Run a server JavaScript test

```
mocha test/hoge.js
```

### Run a server CoffeeScript test

```
mocha test/hoge.coffee
```

### Run all server tests

```
mocha
```

### Run client JavaScript tests using Browser

Open file:`test_client/runner.html`

### Run client JavaScript tests using CLI

```
phantomjs test_client\lib\mocha-phantomjs.coffee test_client\runner.html
```
