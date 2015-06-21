'use strict';

angular.module('socibocoApp')
  .controller('MapCtrl', function ($scope) {
      $scope.message = 'Hello';

	$scope.myMarkers = [];
	
	$scope.mapOptions = {
	    center: new google.maps.LatLng(35.784, -78.670),
	    zoom: 15,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	$scope.addMarker = function ($event) {
	    var marker = new google.maps.Marker({
		map: $scope.myMap,
		position: $event.latLng
	    });
	    $scope.myMarkers.push(marker);
	    //$scope.myMap.panTo(marker);

	};

	$scope.setZoomMessage = function (zoom) {
	    $scope.zoomMessage = 'You just zoomed to ' + zoom + '!';
	    console.log(zoom, 'zoomed');
	};

	$scope.openMarkerInfo = function (marker) {
	    $scope.currentMarker = marker;
	    $scope.currentMarkerLat = marker.getPosition().lat();
	    $scope.currentMarkerLng = marker.getPosition().lng();
	    $scope.myInfoWindow.open($scope.myMap, marker);
	};

	$scope.setMarkerPosition = function (marker, lat, lng) {
	    marker.setPosition(new google.maps.LatLng(lat, lng));
	};

      
  });
