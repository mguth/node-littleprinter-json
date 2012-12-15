var express = require('express'),
    jade = require('jade'),
    handler = require('./handler.js'),
    littleprinter = require('littleprinter');

var app = express();
var port = process.env.PORT || 5000;
var event = require( './event' );

// Use Jade as templating language
app.set('view engine', 'jade');

// Use path prefix to declare static files
app.use('/static', express.static(__dirname + '/public'));

// Acquire JSON content from external source and make it available in templates
var datafeed = require('./datafeed.js');
event.on( 'import_complete', function(){
  app.locals.jsonContent = datafeed.jsonContent;
  // console.log('Imported in server.js: ' + datafeed.jsonContent.length + ' items');
});

// Provide proper index page (disabled b/c of collision with littleprinter module)
// app.get('/', function(req,res){
//     res.render('index', {layout: false});
// });

littleprinter.setup(app, handler);

app.listen(port);
console.log('Server started on: http://localhost:' + port);
