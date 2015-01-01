'use strict';

var request = require('request'),
    mongoose = require('mongoose'),
    Search = mongoose.model('Search');
    
exports.getTracks = function(req, res) {
	// get('http://ws.audioscrobbler.com/2.0/?method=track.search&track=Believe&api_key=6a5ac42ba366bfd38802b82d3433e59d&format=json')
  

  var url ='http://ws.audioscrobbler.com/2.0/?method=track.search&track=',
      api_key = '6a5ac42ba366bfd38802b82d3433e59d',
      track,
      allErr = {};
  track = new Search({term: req.params.track});
  Search
    .findOne({
      term: req.params.track
    })
    .exec(function(err, search) {
      if (err){
        allErr.findErr = 'Database: Term hunt error';
        // return next(err); 
      }
      if (search) {
        track = search;
        track.count += 1;
      }
    });
  // req.assert('track', 'You must enter a track to search').notEmpty();
  
  console.log('Making an API call to http://ws.audioscrobbler.com............');
  console.log('Search term: '+ req.params.track);
  request(url + req.params.track +'&api_key=' + api_key + '&format=json', function (error, response, body) {    
    if (!error && response.statusCode === 200) {
      console.log('API request successful');
      track.success_count += 1;
    	res.send(body);
  	} else {
      console.log('API request failed');
      console.log(error);
      allErr.apiError = error;
      track.failure_count += 1;
      res.send(error);
  	}
    track.save(function(err) {
      if (err) {
        var modelErrors = [];
        if (err.errors) {
          for (var x in err.errors) {
            modelErrors.push({
              param: x,
              msg: err.errors[x].message,
              value: err.errors[x].value
            });
          }
        }
        allErr.modelErrors = modelErrors;
        console.log(allErr);
      }
    });
  });
};
