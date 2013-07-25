nodets-websocket
================

Sample application using Node.JS, WebSocket, Socket.IO, TypeScript and MongoDB

## Build

1. ``npm install``
2. ``node app.js``
3. access to ``http://localhost:3000/``

## Test

### Setup

1. ``npm install -g mocha``
2. ``npm install -g should``
3. ``nmp install -g coffee-script``

### Run a .js test

```
mocha -R spec test\hoge.js
```

### Run a .coffee test

```
mocha --compilers coffee:coffee-script -R spec test\hoge.js
```

### Run all tests

```
mocha --compilers coffee:coffee-script -R spec --recursive
```