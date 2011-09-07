var port = process.env.PORT || 8099;
console.log("Running on port: " + port);
require('./controllers/rootDispatcher.js').app.listen(port);
