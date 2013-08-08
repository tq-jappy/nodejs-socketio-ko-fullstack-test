var chatViewModel = {
    socket: null,
    name: ko.observable(""),
    entered: ko.observable(false),
    message: ko.observable(""),
    messages: ko.observableArray(),
    enter: function() {
        $('#myModal').modal('show');
    },
    cancel: function() {
        $('#myModal').modal('hide');
    },
    connect: function() {
        this.socket = io.connect('http://localhost:3000/');
        bindSocketEvents(this.socket);
        this.entered(true);
        $('#myModal').modal('hide');
    },
    post: function() {
        this.socket.emit('post_message', {name: this.name(), message: this.message()});
        this.message('');
    },
    add: function(name, message) {
        if (this.messages().length > 10) {
            this.messages.pop();
        }
        this.messages.unshift({date: formatDate(new Date()), name: name, message: message});
    }
};

function bindSocketEvents(socket) {
    socket.on('connecting', function() {
        console.log('connecting');
    });

    socket.on('reconnecting', function() {
        console.log('reconnecting');
    });

    socket.on('connect', function() {
        socket.emit('connect', {name: chatViewModel.name()});
    });

    socket.on('reconnect', function() {
        console.log('reconnect');
    });

    socket.on('entered', function(name) {
        console.log("aaa");
        chatViewModel.add(name, 'ログインしました。');
    });

    socket.on('leave', function(name) {
        console.log('someone leaved');

        chatViewModel.add(name, 'ログアウトしました。');
    });

    socket.on('chat_message', function(data) {
        chatViewModel.add(data.name, data.message);
    });
}

$(function() {
    ko.applyBindings(chatViewModel);
});