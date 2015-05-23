'use strict';

angular.module('socibocoApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];

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

      $scope.$on('$create',function(){
	  $('#loadMap').after("<div id='map_canvas'></div>");
	  
	  document.loadGoogleMaps( 3 )
              .done(function() {
		  !!google.maps // true

		  function initialize() {
		      var mapOptions = {
			  scaleControl: true,
			  center: new google.maps.LatLng(30.064742, 31.249509),
			  zoom: 10
		      };

		      var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

		      var marker = new google.maps.Marker({
			  map: map,
			  position: map.getCenter()
		      });
		      var infowindow = new google.maps.InfoWindow();
		      infowindow.setContent('<b>Привіт</b>');
		      google.maps.event.addListener(marker, 'click', function() {
			  infowindow.open(map, marker);
		      });
		  }

		  google.maps.event.addDomListener(window, 'load', initialize);
		  
	      });
	  
      })
  });

