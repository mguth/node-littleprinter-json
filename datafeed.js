var http = require('http');

// Content source configuration
var contentSource = {
  host: 'posterous.com',
  port: 80,
  path: '/api/2/sites/what-i-ate/posts/public'
};

function Datafeed() {
  if(false === (this instanceof Datafeed)) {
      return new Datafeed();
  }
}

Datafeed.prototype.download = function() {

  var jsonContent = "";

  // Start request and get the data
  var req = http.request(contentSource, function(res) {
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

  // The reading is finished, let's parse and return the result
  req.on('close', function() {
    jsonContent = JSON.parse(jsonContent);
    console.log("Import complete: " + jsonContent.length + " items imported from JSON.");
    return jsonContent;
  });

  // Close the request
  req.end();
};

module.exports = Datafeed;