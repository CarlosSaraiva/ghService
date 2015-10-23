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
    console.log('mongo connected');
});

var issueSchema = mongoose.Schema({
    title: String,
    state: String,
    login: String,
    update: String,
    link: String
});

var Issue = mongoose.model('Issue', issueSchema);

app.post('/hooks/github/', githubMiddleware, function (req, res) {

    if (req.headers['x-github-event'] == 'issues') {
        var issue = new Issue({
            title: req.body.issue.title,
            state: req.body.issue.state,
            login: req.body.issue.user.login,
            update: req.body.issue.updated_at,
            link: req.body.issue.html_url
        });
        console.log(issue);
        issue.save();
    }
    io.emit('message', {
        'alert': 'new'
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