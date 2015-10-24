var express = require('express');
var router = express.Router();
var Event = require('../models/event.js');
var cotacao;
var githubMiddleware = require('github-webhook-middleware')({
    secret: '1234'
});

router.post('/hooks/github/', githubMiddleware, function (req, res) {
    var event = new Event({
        action: req.headers['x-github-event'],
        request: req.body,
    });
    event.save();
    io.emit('newItem', {});
    console.debug(event);
    res.send("New " + event.action + " has been added!");
});

module.exports = router;