'use strict';

// var mean = require('meanio');

module.exports = function(System, app, auth, database) {
  var index = require('../controllers/index');
  var track = require('../controllers/track');
  app.route('/')
    .get(index.render);
// <<<<<<< Updated upstream


//   app.get('/*',function(req,res,next){
//         res.header('workerID' , JSON.stringify(mean.options.workerid) );
//         next(); // http://expressjs.com/guide.html#passing-route control
//   });
// =======
  app.route('/track/:track')
  	.get(track.getTracks);
// >>>>>>> Stashed changes
};
