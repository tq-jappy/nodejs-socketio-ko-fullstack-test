$(function() {
    var socket = io.connect('http://localhost:3000/');

    socket.on('connect', function() {
        console.log('connected');
    });

    socket.on('enter', function(socketId) {
        console.log('someone entered');

        var date = new Date();
        $('#list').prepend($('<dt>' + date + '</dt><dd>' + socketId + ' logged in.</dd>'));
    });

    socket.on('leave', function(socketId) {
        console.log('someone leaved');

        var date = new Date();
        $('#list').prepend($('<dt>' + date + '</dt><dd>' + socketId + ' logout.</dd>'));
    });

    $("#btn").click(function() {
        var msg = $('#message');
        console.log(msg);

        socket.emit('msg send', msg.val());
    });

    socket.on('msg push', function(msg) {
        console.log(msg);

        var date = new Date();
        $('#list').prepend($('<dt>' + date + '</dt><dd>' + msg + '</dd>'));
    });
});