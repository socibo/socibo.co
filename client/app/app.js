'use strict';
function onGoogleReady() {
    angular.bootstrap(document.getElementById("map"), ['ui.map'])
}


angular.module('socibocoApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'btford.socket-io',
    'ui.router',
    'ui.bootstrap',
    'ui.map',
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',    
])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $ocLazyLoadProvider) {

	$ocLazyLoadProvider.config({
	    debug:false,
	    events:true,
	});

	$urlRouterProvider
	    .otherwise("/");
	
	$locationProvider.html5Mode(true);
	$httpProvider.interceptors.push('authInterceptor');
    })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });
