var express = require('express'),
    jade = require('jade'),
    handler = require('./handler.js'),
    littleprinter = require('littleprinter');

var app = express();
var port = process.env.PORT || 5000;

// Use Jade as templating language
app.set('view engine', 'jade');

littleprinter.setup(app, handler);

app.listen(port);
console.log('Server started on: http://localhost:' + port);
