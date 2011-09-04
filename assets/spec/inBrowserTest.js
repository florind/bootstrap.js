var zombie = require('zombie'),
  sys = require('sys'),
  server = require('../controller/rootDispatcher.js').server;

var serverPort = 40101;
server.listen(serverPort);
var browser = new zombie.Browser({debug: false});

exports['Page should properly render'] = function(test) {
  browser.runScripts = true;
  browser.visit("http://localhost:" + serverPort, function(err, browser, status) {
    if(err) {
      console.log(err.message);
    }
    test.equal(err, null);
    test.equal(status, 200);
    test.equal(browser.text("title"), "Bootstraping done"); 
    test.done();
    cleanup();
  });
};

//TODO: add more browser tests once we figure how to upload a file via zombie's browser.attach 
// See https://github.com/assaf/zombie/issues/159 for more details.

/*
Currently nodeunit doesn't support a global teardown (see this too https://github.com/caolan/nodeunit/pull/85), 
otherwise we'd call server.close there...
As a workaround, we keep track of the current executed tests and
shut down the server when the count reaches the total # of tests. */

var globalTestCount = 1;  //total number of tests.
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
