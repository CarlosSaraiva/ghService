var mongoose = require('mongoose');

mongoose.connect("mongodb://schz:var1234@ds043714.mongolab.com:43714/heroku_16nc3w22");
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function (callback) {
    console.log('Mongo connected!');
});

module.exports = mongoose;