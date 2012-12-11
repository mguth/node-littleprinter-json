var express = require('express'),
    jade = require('jade'),
    http = require('http'),
    handler = require('./handler.js'),
    littleprinter = require('littleprinter');

var app = express();
var port = process.env.PORT || 5000;

// Use Jade as templating language
app.set('view engine', 'jade');

// Use path prefix to declare static files
app.use('/static', express.static(__dirname + '/public'));



// Content server details
var contentSourceOptions = {
  host: 'posterous.com',
  port: 80,
  path: '/api/2/sites/what-i-ate/posts/public'
};

var jsonContent = "";

// Start request and get the data
var req = http.request(contentSourceOptions, function(res) {
  console.log('Remote server response: ' + res.statusCode);
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    jsonContent += chunk;
  });
});

// Show errors
req.on('error', function(e) {
  console.log('Problem with request: ' + e.message);
});

// The reading is finished, let's parse the result
req.on('close', function() {
  jsonContent = JSON.parse(jsonContent);
  console.log("Import complete: " + jsonContent.length + " items imported from JSON.");
});

// Close the request
req.end();


// Provide proper index page
app.get('/', function(req,res){
    res.render('index', {layout: false});
});


// Push acquired JSON content to edition template
// app.get('/edition', function(req,res){
//   res.render('edition', {pageData: jsonContent});
// });



littleprinter.setup(app, handler);

app.listen(port);
console.log('Server started on: http://localhost:' + port);
