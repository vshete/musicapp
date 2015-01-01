'use strict';

angular.module('mean.system').controller('SearchController', ['$scope', '$http',
  function($scope, $http) {
    $scope.submit = function(){
      if ($scope.track) {
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
    $scope.trackno = 1;
    $scope.position = {left: '0%', top: '0%'};
    $scope.trackPosition = function(){
      $scope.position.left = 5 + ($scope.trackno-1)%5*20 + '%';
      $scope.position.top = Math.floor(($scope.trackno-1)/5)*25+ 30 + '%';
      $scope.trackno += 1;
    };
  }
])
.directive('scroll', function ($window, $rootScope, $anchorScroll) {
  return function() {
    angular.element($window).bind('scroll', function() {
      var y = $window.pageYOffset;
      var h = $window.innerHeight;
      if(y/h > 0.1){
        $rootScope.scrollVisible = true;
      }else{
        $rootScope.scrollVisible = false;
      }
      $rootScope.gotoTop = function(){
        $anchorScroll();
      };
      $rootScope.$apply();
    });
  };
});
