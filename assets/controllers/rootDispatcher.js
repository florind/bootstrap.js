var express = require('express');

//configuration
var app = express.createServer();
app.configure(function() {
  app.set('views', './views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(require('stylus').middleware({
    src: './public'
  }));
  app.use(express.static('./public'));
});
exports.app = app;

//request router
app.get('/', function(req, res) {
  res.render('index', {
    'title': 'Bootstraping done'
  });
});

app.get('/health', function(req, res) {
  //some smart checks should go here
  res.send(getHealthCheckJsonBody(), {
    'Content-Type' : 'application/json'
  }, 200);
});

function getHealthCheckJsonBody() {
  return '{"status": "OK"}';
};
module.exports.getHealthCheckJsonBody = getHealthCheckJsonBody;