bootstrap.js - Bootstrapping your node application in the cloud
=============

Bootstrap.js provides a fast way for developers who want to start with node.js to create a structured node webapp
and to deploy it in the cloud. Currently supported hosting providers are Heroku and Joyent's no.de. 

Testing
-------

The bootstrapped application adds minimal testing structures for:
* Unit tests
* web service testing
* Browser-driven testing via zombie

The application uses the following modules:
- Express framework for routing http://expressjs.com/
- Jade template engine http://jade-lang.com/


Application structure
-------
 
The project structure is:

controller/
view/           <-- view templates
public/
spec/           <-- all tests are here
package.json
web.js

To cope with differences between Heroku and no.de deployment reqiurements, some files and config options are redundant in one or the other
environment (i.e. Procfile is used only by Heroku).

Prerequisites
-------

- node.js >= v0.4.0
- npm >= 1.0.17
- git >= 1.7

Cloud deployment
-------

For cloud deployment one of the following are mandatory:
- A Heroku account (free signup at http://heroku.com) and local connectivity
- A no.de account (gratis signup at http://no.de) and a provisioned machine 

Bootstrapping
-------

Just run:

  ./init-webapp.sh target-dir <options>
  
and at the end of the bootstrap process, a fully functional application skeleton will be ready in target-dir. If one of the supported cloud
environments is supplied, the app will also be deployed in that environment. 