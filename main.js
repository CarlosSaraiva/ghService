var app = require('express')();
var server = require('http').Server(app);
var io = require("socket.io")(server);
var db = require('./services/database.js');

//Routes
var githubRoute = require('./routes/github.js')(io);
var actionRoute = require('./routes/action.js');
app.use('/github', githubRoute);
app.use('/action', actionRoute);

//Server and IO initialization
server.listen((process.env.PORT || '3001'), function () {
    'use strict';
    var host = server.address().address,
        port = server.address().port;
    console.log('Server listening: //%s:%s', host, port);
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