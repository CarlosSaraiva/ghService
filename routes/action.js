var express = require('express');
var router = express.Router();
var Event = require('../models/event.js');

router.get('/issues', function (req, res) {
    var query = Event.find({
        'action': 'issues'
    });

    query.exec(function (err, issues) {
        res.json(issues);
    });
});

module.exports = router;