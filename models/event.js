var mongo = require('mongoose'),
    Schema = mongo.Schema;

var eventSchema = new Schema({}, {
    strict: false
});

eventSchema.statics.countEventsGroups = function countEventsGroups() {
    "use strict";
    var that = this;
    return new Promise(function (resolve, reject) {
        that.aggregate([{
            $group: {
                _id: '$action',
                count: {
                    $sum: 1
                }
            }
        }], function (err, count) {
            if (err) {
                reject(err);
            } else {
                console.log('countEventsGroups succceded!');
                resolve(count);
            }
        });

    });
};

eventSchema.statics.dbSaveEvent = function dbSaveEvent(event) {
    'use strict';
    return new Promise(function (resolve, reject) {
        event.save(function (err) {
            if (!err) {
                console.log('dbSaveEvent succceded!');
                resolve();
            } else {
                reject(err);
            }
        });

    });
};

module.exports = mongo.model('Event', eventSchema);