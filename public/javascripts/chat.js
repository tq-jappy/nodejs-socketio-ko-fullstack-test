$(function() {
    var socket = null;


    function formatDate(date) {
        if (date) {
            return date.getFullYear() + "/"
              + twoDigits(date.getMonth()+1) + "/"
              + twoDigits(date.getDate()) + " "
              + twoDigits(date.getHours()) + ":"
              + twoDigits(date.getMinutes()) + ":"
              + twoDigits(date.getSeconds());
        } else {
            return "";
        }
    }

    function twoDigits(value) {
        if (value < 10) {
            return "0" + value;
        } else {
            return value;
        }
    }

    // Knockout
    var chatViewModel = {
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
            socket = io.connect('http://localhost:3000/');
            bindSocketEvents();
            this.entered(true);
            $('#myModal').modal('hide');
        },
        post: function() {
            socket.emit('post_message', {name: this.name(), message: this.message()});
            this.message('');
        },
        add: function(name, message) {
            if (this.messages().length > 10) {
                this.messages.pop();
            }
            this.messages.unshift({date: formatDate(new Date()), name: name, message: message});
        }
    };
    ko.applyBindings(chatViewModel);

    function bindSocketEvents() {
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
});