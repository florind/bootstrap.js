var app = require('../controllers/rootDispatcher.js');

exports["Health check body text is valid json"] = function(test) {
  test.ok(JSON.parse(app.getHealthCheckJsonBody()) != null);
  test.done();
};