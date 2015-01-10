'use strict';

// var mean = require('meanio');

module.exports = function(System, app, auth, database) {
  var index = require('../controllers/index');
  var track = require('../controllers/track');
  
  app.route('/')
    .get(index.render);
  app.route('/track/:track')
  	.get(track.getTracks);
};
