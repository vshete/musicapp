'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module,
  favicon = require('serve-favicon'),
  express = require('express');

var SystemPackage = new Module('system');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
SystemPackage.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  SystemPackage.routes(app, auth, database);

  SystemPackage.aggregateAsset('css', 'common.css');

  // The middleware in config/express will run before this code

  // Set views path, template engine and default layout
  app.set('views', __dirname + '/server/views');
  app.use('/css', express.static(__dirname + '/public/assets/css'));
  app.use('/img', express.static(__dirname + '/public/assets/img'));
  
  // Setting the favicon and static folder
  app.use(favicon(__dirname + '/public/assets/img/icon.png'));

  // Adding robots and humans txt
  app.use(express.static(__dirname + '/public/assets/static'));
  // app.use('/css', express.static(__dirname + '/public/css'));

  return SystemPackage;
});
