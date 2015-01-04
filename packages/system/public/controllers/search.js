'use strict';

angular.module('mean.system').controller('SearchController', ['$scope', '$http',
  function($scope, $http) {
    $scope.submit = function(){
      if ($scope.track) {
        $scope.trackno = 1;
        $scope.position = {left: '0%', top: '0%'};
   		 	$http.get('/track/' + $scope.track).
      		success(function (data, status, headers, config) {
            if('errno' in data){
              if(data.errno === 'ENOTFOUND'){
                alert('Could not connect to the server') ;
              }else{
                alert(data.errno);
              }
            }else{
              $scope.tracks = data.results.trackmatches.track;            
            }
  				}).
  				error(function () {
  					alert('Sorry. Something went wrong.');
  				});
      }
    };
    $scope.trackPosition = function(){
      $scope.position.left = 5 + ($scope.trackno-1)%7*10 + '%';
      $scope.position.top = Math.floor(($scope.trackno-1)/7)*18+ 30 + '%';
      $scope.trackno += 1;
    };
  }
]);
