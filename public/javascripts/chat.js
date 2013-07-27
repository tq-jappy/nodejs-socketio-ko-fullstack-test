$(function() {
    var socket = io.connect('http://localhost:3000/');

    // Knockout
    var MessageViewModel = function(date, message) {
        this.date = ko.observable(date);
        this.message = ko.observable(message);
    };

    var chatViewModel = {
        // socket: io.connect('http://localhost:3000/'),
        message: ko.observable(""),
        messages: ko.observableArray(),
        connect: function() {
            alert("a!");
        },
        post: function() {
            console.log(this.message());
            socket.emit('msg send', this.message());
        },
        add: function(date, message) {
            if (this.messages().length > 10) {
                this.messages.pop();
            }
            var newItem = new MessageViewModel(date, message);
            this.messages.unshift(newItem);
        }
    };
    ko.applyBindings(chatViewModel);

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