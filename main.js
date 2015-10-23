var express = require('express');
var app = express();
var githubMiddleware = require('github-webhook-middleware')({
    secret: '1234'
});
var messages = [];

app.get('/', function (req, res) {
    res.json(JSON.stringify(messages));
});

app.post('/hooks/github/', githubMiddleware, function (req, res) {
    var payload = req.body,
        repo = payload.repository.full_name,
        branch = payload.ref.split('/').pop();

    messages.push(payload);
});

var server = app.listen((process.env.PORT || '3001'), function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server listening: //%s:%s', host, port);
});