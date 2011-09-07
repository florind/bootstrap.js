var globalTestCount = 2;  //total number of tests. Update if the count changes!!

var http = require('http'),
  server = require('../controllers/rootDispatcher.js').app;

var serverPort = 40101;
server.listen(serverPort);

var client = http.createClient(serverPort, 'localhost');

exports['GET nonexistent file should return 404 Not Found'] = function(test) {
  var req = client.request('GET', '/nothing');
  req.on('response', function(res) {
    res.on('end', function() {
      test.equal(res.statusCode, 404);
      cleanup();
      test.done();
    });
  });
  req.end();
};

exports['GET /health should return OK'] = function(test) {
  var req = client.request('GET', '/health');
  req.on('response', function(res) {
    res.on('end', function() {
      test.equal(res.statusCode, 200);
      cleanup();
      test.done();
    });
  });
  req.end();
};

var currentExecutedTestCount = 0;
/*
This method increments the number of executed tests
Call cleanup() after test.done.
shutdown the server if all tests have executed.
*/
function cleanup() {
  currentExecutedTestCount++;
  if(currentExecutedTestCount == globalTestCount) {
    server.close();
  }
}
