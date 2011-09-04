bootstrap.js - Bootstrapping your node application in the cloud
----------------------------------------------------------------------------
Bootstrap.js provides a fast way developers who want to start developing a node web application to create a structured node webapp
and to deploy it in the cloud. Currently supported hosting providers are Heroku and Joyent's no.de. 

The bootstrapped application adds minimal testing structures for:
- Unit tests
- web service testing
- Browser-driven testing via zombie

The directory structure is:

controller/
view/
public/
spec/
package.json
Procfile
web.js