var app = require('express')();
var server = require('http').Server(app);
var io = require("socket.io")(server);
var db = require('./services/database.js');

//Routes
var githubRoute = require('./routes/github.js')(io);
app.use('/github', githubRoute);

//Server and IO initialization
server.listen((process.env.PORT || '3001'), function () {
    'use strict';
    var host = server.address().address,
        port = server.address().port;
    console.log('Server listening: //%s:%s', host, port);
});

io.on('connection', function (socket) {
    'use strict';
    console.debug(socket);
    socket.emit('newuser', {
        message: "Hello Stranger!"
    });
    console.log("Usuário conectado!");
});