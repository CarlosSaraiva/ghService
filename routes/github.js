var express = require('express');
var payload = require('./payload.js');
var router = express.Router();
var Event = require('../models/event.js');
var githubMiddleware = require('github-webhook-middleware')({
    secret: '1234'
});

module.exports = function (io) {
    'use strict';

    router.post('/', githubMiddleware, function (req, res) {
        var event = new Event({
            action: 'issues',
            request: req.body
        });

        Event.dbSaveEvent(event)
            .then(function () {
                return io.emitIO('onnewrequest', req);
            })
            .then(function () {
                return Event.countEventsGroups(this);
            })
            .then(function (actionsCount) {
                console.log(actionsCount);
                io.emitIO('ondbgroupby', actionsCount);
            })
            .catch(function (err) {
                console.log(err);
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