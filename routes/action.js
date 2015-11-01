var express = require('express');
var router = express.Router();
var Event = require('../models/event.js');

router.get('/counter', function (req, res) {
    Event.countEventsGroups()
        .then(function (counter) {
            res.json(counter);
        })
        .catch(function (err) {
            console.log(err);
        });
});

router.get('/issues', function (req, res) {
    var query = Event.find({
        'action': 'issues'
    });

    query.exec(function (err, issues) {
        res.json(issues);
    });
});

module.exports = router;