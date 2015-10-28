var Event = require('../models/event.js');

module.exports = function (server) {
    var io = require("socket.io")(server);
    var listeners = [];

    io.emitIO = function (event, data) {
        return new Promise(function (resolve, reject) {
            io.emit(event, JSON.stringify(data));
            console.log('Event \'' + event + '\' emited.');
            resolve(true);
        });
    };

    io.on('teste', function (data) {
        console.log('Event \'' + 'test' + '\' received.');
    });

    io.on('onnewrequest', function (data) {
        console.log('Event \'' + 'onnewrequest' + '\' received.');
    });

    io.on('ondbgroupby', function (data) {
        console.log('Event \'' + 'ondbgroupby' + '\' received.');
    });

    io.on('connection', function (socket) {
        'use strict';
        socket.emit('newuser', {
            message: "Hello Stranger!",
            id: socket.id,
            ip: socket.handshake.headers['x-forwarded-for'],
            port: socket.handshake.headers['x-forwarded-port'],
            timestamp: socket.handshake.time
        });
        console.log("Usuário conectado!");
    });
    return io;
};