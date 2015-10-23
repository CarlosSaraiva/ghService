var app = require('express')();
var server = require('http').Server(app);
var io = require("socket.io")(server);
var mongoose = require('mongoose');
var githubMiddleware = require('github-webhook-middleware')({
    secret: '1234'
});

mongoose.connect("mongodb://schz:var1234@ds043714.mongolab.com:43714/heroku_16nc3w22");
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('Mongo connected');
});

var eventSchema = mongoose.Schema({}, {
    strict: false
});

var Event = mongoose.model('Event', eventSchema);

app.post('/hooks/github/', githubMiddleware, function (req, res) {
    var event = new Event({
        action: req.headers['x-github-event'],
        request: req.body,
    }).save();

    console.log(event);
    io.emit('newItem', {});
    res.send("New " + event.action + " has been added!");
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