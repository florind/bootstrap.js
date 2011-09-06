bootstrap.js - Bootstrapping your node application in the cloud
=============

Bootstraping a node.js web application is easy enough. Bootstrap.js automates the whole application creation and strcture
Bootstrap.js provides a fast way for developers who want to start with node.js to create a structured node webapp
and to deploy it in the cloud. Currently supported hosting providers are Heroku and Joyent's no.de. 

What happens upon install
-------
A complete web application is seeded in the specified target directory. If a cloud environment is specified then the app is 
remotely deployed there.

Testing
-------
The bootstrapped application adds minimal testing structures for:

* Unit tests
* web service testing
* Browser-driven testing via zombie

The application uses the following modules:

* Express framework for routing http://expressjs.com/
* Jade template engine http://jade-lang.com/

Application structure
-------
 
The project structure has been inspired by http://stackoverflow.com/questions/5178334/folder-structure-for-a-nodejs-project

    controller/
    view/           <-- view templates
    public/
    spec/           <-- BDD tests and web service tests here
    test/           
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
* A Heroku account (free signup at http://heroku.com) and local connectivity
* A no.de account (gratis signup at http://no.de) and a provisioned machine 

Bootstrapping
-------

Just run:

    ./init-webapp.sh target-dir <options>
  
and at the end of the bootstraping process, a fully functional application skeleton will be ready in target-dir, on a local git repo and
(optionally) pushed to the cloud.
This skeleton should provide enough breadth to start developing your own web app in style.
