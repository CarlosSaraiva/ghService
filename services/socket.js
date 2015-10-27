module.exports = function (server) {
    var io = require("socket.io")(server);

    var count = function () {
        var db = Event.aggregate([{
            $group: {
                _id: '$action',
                count: {
                    $sum: 1
                }
            }
        }], function (err, result) {
            if (err) {
                io.emit('onError', err);
            } else {
                io.emit('onDbCount', {
                    groupBy: result
                });
                console.log('onDbCount triggered');
            }
        });
    };

    io.on('connection', function (socket) {
        'use strict';
        socket.emit('newuser', {
            message: "Hello Stranger!",
            id: socket.id,
            ip: socket.handshake.headers['x-forwarded-for'],
            port: socket.handshake.headers['x-forwarded-port'],
            timestamp: socket.handshake.time
        });
        count();
        console.log("Usuário conectado!");
    });

    return io;
};