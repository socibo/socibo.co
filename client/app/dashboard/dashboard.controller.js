'use strict';
/**
 * @ngdoc function
 * @name socibocoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the socibocoApp
 */
angular.module('socibocoApp')
    .controller('DashboardCtrl', ['$scope', '$timeout', function ($scope, $timeout, socket, User, Auth) {
	$scope.errors = {};
	$scope.currentUser = Auth.getCurrentUser();
	$scope.facebook = $scope.currentUser.facebook;

	$scope.changePage = function(form){
	    var currentUserId =  $scope.currentUser._id;
	    
	    // $http.get("/api/pages", {id: currentUserId}).success(function(){
	    // 	$http.put('/api/pages', { _id: currentUserId, name: $scope.account.name });
	    // 	$scope.newPage = '';
	    // }).failure(function(){
	    // 	$http.post('/api/pages', { _id: currentUserId, name: $scope.account.name });
	    // 	$scope.newPage = '';
	    // })
	    
	    $http.post('/api/pages', {user_id: currentUserId, page_id: $scope.account.id, name: $scope.account.name }).error(function(){
		console.log("processing...");
	    })
	    $scope.newPage = '';
	    
	    // $http.get('/api/things').success(function(awesomeThings) {
	    // 	$scope.awesomeThings = awesomeThings;
	    // 	socket.syncUpdates('thing', $scope.awesomeThings);
	    // });	    
	}
	

	$scope.changePassword = function(form) {
	    $scope.submitted = true;
	    if(form.$valid) {
		Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
		    .then( function() {
			$scope.message = 'Password successfully changed.';
		    })
		    .catch( function() {
			form.password.$setValidity('mongoose', false);
			$scope.errors.other = 'Incorrect password';
			$scope.message = '';
		    });
	    }
	};
	
}]);
