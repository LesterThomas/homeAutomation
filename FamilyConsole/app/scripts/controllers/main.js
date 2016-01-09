'use strict';

/**
 * @ngdoc function
 * @name familyConsoleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the familyConsoleApp
 */
angular.module('familyConsoleApp')
  .controller('MainCtrl', function ($scope, websocketService) {
    $scope.boostStatus='boost';
    $scope.homeStatus={};

	$scope.boost = function() {
	    $scope.boostStatus = 'processing';
	    setTimeout($scope.processingComplete,200);
	  };

	$scope.cancelBoost = function() {
	    $scope.boostStatus = 'processing';
	    setTimeout($scope.processingComplete,200);
	  };

	$scope.processingComplete=function(){
		$scope.boostStatus ='cancelBoost';
	}
  

	setTimeout('document.location.reload();',60000);

	var socketaddy = "ws://thethingbox:1880/api/ws/homeautomationevent";
	    
    var sock;
    
	websocketService.start(socketaddy, function (evt) {
        var homeautomationevent = JSON.parse(evt.data);
        $scope.$apply(function () {
        	console.log("Current Status: " , $scope.homeStatus);
	       	console.log("Got homeautomationevent: " , homeautomationevent);
	       	$scope.homeStatus=homeautomationevent;
        });
    });     
})

.factory('websocketService', function () {
        return {
            start: function (url, callback) {
                var websocket = new WebSocket(url);
                websocket.onopen = function () {
                };
                websocket.onclose = function () {
                };
                websocket.onmessage = function (evt) {
                    callback(evt);
                };
            }
        }
    }
);