var app = require('express')();
var server = require('http').Server(app);
var io = require("./services/socket.js")(server);
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