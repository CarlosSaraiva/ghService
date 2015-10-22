var http = require('http');
var createHandler = require('github-webhook-handler');
var handler = createHandler({
    path: 'CarlosSaraiva/HelloGraph',
    secret: '1234'
});
var Router = require("node-simple-router");
var router = Router();
var messages = [];

router.get('/', function (req, res) {
    res.end(JSON.stringify(messages));
});

http.createServer(router, function (req, res) {
    handler(req, res, function (err) {
        res.statusCode = 404;
        res.end('no such location');
    });
}).listen(process.env.PORT || '3001');

handler.on('error', function (err) {
    console.error('Error:', err.message);
});

handler.on('*', function (event) {
    console.log('Received a push event for %s to %s',
        event.payload.repository.name,
        event.payload.ref);
    messages.push(event);
});