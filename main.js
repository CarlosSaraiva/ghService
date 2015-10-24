var app = require('express')();
var server = require('http').Server(app);
var io = require("socket.io")(server);
var db = require('./services/database.js');

//Routes
var githubRoute = require('./routes/github.js');
app.use('/github', githubRoute);

//Server and IO initialization
server.listen((process.env.PORT || '3001'), function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server listening: //%s:%s', host, port);
});

io.on('connection', function (socket) {
    socket.emit('newuser', {
        message: "Hello Stranger!"
    });
    console.log("Usuário conectado!");
});