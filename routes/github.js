var express = require('express');
var router = express.Router();
var Event = require('../models/event.js');
var githubMiddleware = require('github-webhook-middleware')({
    secret: '1234'
});

module.exports = function (io) {
    'use strict';

    var count = (function () {
        var db = Event.aggregate([{
            $group: {
                _id: '$action',
                count: {
                    $sum: 1
                }
            }
        }], function (err, result) {
            if (err) {
                io.emit('onError', err);
            } else {
                io.emit('onDbCount', result);
                console.log('onDbCount triggered');
            }
        });
    })();

    router.post('/', githubMiddleware, function (req, res) {
        var event = new Event({
            action: req.headers['x-github-event'],
            request: req.body,
        });

        event.save();
        io.emit('newItem', {
            item: req.headers['x-github-event'],
            count: count
        });

        res.send("New " + event.action + " has been added!");
    });

    router.get('/', function (req, res) {
        var query = Event.find({});
        query.exec(function (err, all) {
            if (err) return err;
            res.json(all);
        });

    });

    return router;
};