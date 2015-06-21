'use strict';

angular.module('socibocoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('requestDemo', {
        url: '/requestDemo',
        templateUrl: 'app/main/requestDemo.html',
        controller: 'MainCtrl'
      })
      .state('gotcha', {
        url: '/gotcha',
        templateUrl: 'app/main/register.html',
        controller: 'RegisterCtrl'
      });      
  });
