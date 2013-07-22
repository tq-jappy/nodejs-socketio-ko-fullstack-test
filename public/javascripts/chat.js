$(function() {
    var socket = io.connect('http://localhost:3000/');

    socket.on('connect', function() {
        console.log('connected');
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