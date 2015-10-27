var mongo = require('mongoose'),
    Schema = mongo.Schema;

var eventSchema = new Schema({}, {
    strict: false
});

eventSchema.statics.groupBy = function groupBy(key, callback) {
    this.aggregate([{
        $group: {
            _id: '$action',
            count: {
                $sum: 1
            }
        }
    }], function (err, result) {
        if (err) {
            console.log(err);
        } else {
            callback(result);
        }
    });

};

module.exports = mongo.model('Event', eventSchema);