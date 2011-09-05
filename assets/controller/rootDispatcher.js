var http = require('http'), 
  express = require('express'),
  jade = require('jade');

var server = express.createServer();
server.set('views', './view');
server.set('view engine', 'jade');
server.use(express.bodyParser());
exports.server = server;

//request router
server.get('/', function(req, res) {
  res.render('index', {
    'title': 'Bootstraping done'
  });
});

server.get('/health', function(req, res) {
  //some smart checks should go here
  res.send('{status: "OK"}', {
    'Content-Type' : 'text/json'
  }, 200);
});
