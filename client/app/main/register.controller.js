'use strict';

angular.module('socibocoApp')
    .controller('RegisterCtrl', function ($scope, $http, $state, socket) {
      $scope.awesomeThings = [];
      $scope.invitationCode = "";
    })
