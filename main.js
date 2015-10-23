var app = require('express')();
var server = require('http').Server(app);
var io = require("socket.io")(server);
var githubMiddleware = require('github-webhook-middleware')({
    secret: '1234'
});

app.post('/hooks/github/', githubMiddleware, function (req, res) {
    io.emit('githubevent', {
        new: req.headers
    });
    res.send("Ok!!");
});

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