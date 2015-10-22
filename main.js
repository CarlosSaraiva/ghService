var gith = require('gith').create(9001);
var express = require('express');
var app = express();
var messages = [];

app.get('/', function (req, res) {
    res.json(messages);
});

var server = app.listen(80, funcion() {
    console.log("Server started!");
})

gith({
    repo: 'carlossaraiva/hellograph'
}).on('all', function (payload) {
    messages.push(payload);
    console.log('Post-receive happened!');
});