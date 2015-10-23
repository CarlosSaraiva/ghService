var express = require('express');
var app = express();
var githubMiddleware = require('github-webhook-middleware')({
    secret: '1234'
});
var messages = [];

app.get('/', function (req, res) {
    res.json(messages);
});

app.post('/hooks/github/', githubMiddleware, function (req, res) {
    messages.push(req.body);
    res.send("Ok");
});

var server = app.listen((process.env.PORT || '3001'), function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server listening: //%s:%s', host, port);
});