'use strict';

angular.module('socibocoApp')
    .controller('MainCtrl', function ($scope, $http, $state, socket) {
      $scope.awesomeThings = [];
      $scope.invitationCode = "";

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

      $("#code").on("keyup", function(e){
	  console.log($scope.invitationCode);
	  if($scope.invitationCode == 'XskkK3Jss')
	      $state.go('gotcha')
      })

  });

