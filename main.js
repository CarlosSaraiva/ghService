var gith = require('gith').create(9001);

gith({
    repo: 'carlossaraiva/hellograph'
}).on('all', function (payload) {
    console.log('Post-receive happened!');
});