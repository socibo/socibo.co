'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('socibocoApp')
    .directive('headerNotification',function(){
	return {
            templateUrl:'scripts/directives/header/header-notification/header-notification.html',
	    restrict: 'E',
	    replace: true,
	    controller: function($scope, $http, Auth, User){
		$scope.errors = {};
		$scope.account = {};
		$scope.currentUser = Auth.getCurrentUser();
		$scope.facebook = $scope.currentUser.facebook;
		
		var currentUserId =  $scope.currentUser._id;

		$scope.changePage = function(page){
		    console.log("Now showing", page.name, "data")
		}
		$http.get("/api/pages", { id: currentUserId })
		    .success(function(pages){
			$scope.pages = pages;
			console.log(pages);
		    });
		
		
		// $http.get("/api/pages", {id: currentUserId}).success(function(){
		// 	$http.put('/api/pages', { _id: currentUserId, name: $scope.account.name });
		// 	$scope.newPage = '';
		// }).failure(function(){
		// 	$http.post('/api/pages', { _id: currentUserId, name: $scope.account.name });
		// 	$scope.newPage = '';
		// })
		
		// $http.post('/api/pages', {user_id: currentUserId, page_id: $scope.account.id, name: $scope.account.name }).error(function(){
		//     console.log("processing...");
		// })
		$scope.newPage = '';
	    }
    	}
    });


