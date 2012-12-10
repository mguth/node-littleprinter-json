var express = require('express'),
    haml = require('hamljs'),
    cons   = require('consolidate'),
    handler = require('./handler.js'),
    littleprinter = require('littleprinter');

var app = express();
var port = process.env.PORT || 5000;

// Make HAML.js work (with the help of consolidate)
app.engine('haml', cons.haml);
app.set('view engine', 'haml');

littleprinter.setup(app, handler);

app.listen(port);
console.log('Server started on: http://localhost:' + port);
