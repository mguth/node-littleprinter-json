var express = require('express'),
    jade = require('jade'),
    handler = require('./handler.js'),
    littleprinter = require('littleprinter');

var app = express();
var port = process.env.PORT || 5000;

// Use Jade as templating language
app.set('view engine', 'jade');

// Use path prefix to declare static files
app.use('/static', express.static(__dirname + '/public'));
// Provide proper index page
app.get('/', function(req,res){
    res.render('index', {layout: false});
});
littleprinter.setup(app, handler);

app.listen(port);
console.log('Server started on: http://localhost:' + port);
