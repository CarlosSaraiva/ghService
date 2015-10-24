var mongo = require('mongoose'),
    Schema = mongo.Schema;

var eventSchema = new Schema({}, {
    strict: false
});

module.exports = mongo.model('Event', eventSchema);