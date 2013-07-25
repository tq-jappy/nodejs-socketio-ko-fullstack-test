$(function() {
    var socket = io.connect('http://localhost:3000/');

    // Knockout
    var MessageViewModel = function(date, message) {
        this.date = ko.observable(date);
        this.message = ko.observable(message);
    };

    var appViewModel = {
        messages: ko.observableArray(),
        add: function(date, message) {
            var newItem = new MessageViewModel(date, message);
            this.messages.push(newItem);
        }
    };
    ko.applyBindings(appViewModel);

    $("#btn").click(function() {
        var msg = $('#message');
        console.log(msg);

        socket.emit('msg send', msg.val());
    });

    socket.on('connecting', function() {
        console.log('connecting');
    });

    socket.on('connection', function() {
        console.log('connection');
    });

    socket.on('connect_failed', function() {
        console.log('connect_failed');
    });

    socket.on('reconnecting', function() {
        console.log('reconnecting');
    });

    socket.on('reconnect', function() {
        console.log('reconnect');
    });

    socket.on('connect', function() {
        console.log('connected');
    });

    // emit event

    socket.on('enter', function(socketId) {
        console.log('someone entered');

        var date = new Date();
        appViewModel.add(date, socketId + ' logged in!');
    });

    socket.on('leave', function(socketId) {
        console.log('someone leaved');

        var date = new Date();
        appViewModel.add(date, socketId + ' logged out!');
    });

    socket.on('msg push', function(msg) {
        console.log(msg);

        var date = new Date();
        appViewModel.add(date, 'say: ' + msg);
    });
});