'use strict';
var myApp = angular.module('myApp', []);

var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
$(function () {
	  $('[data-toggle="tooltip"]').tooltip()
	});//enable custom tooltips
myApp.controller('controller', [ '$scope', function($scope) {
	//initialize all the variables
	$scope.nightCount = 0;
	$scope.petCount = 0;
	$scope.accessibility = 0;
	$scope.warning = [];
	var today = new Date();
	$scope.checkin = new Date(today);
	$scope.checkout = new Date(today.setDate(today.getDate() + 1));
	$scope.showWarning = false;
	$scope.showRoom = false;
	$scope.cost = 0;
	//function to be called after checkin/checkout date is changed;
	$scope.changeDate = function(){
		if($scope.checkout<=$scope.checkin){
			var checkout = new Date($scope.checkin);
			checkout.setDate(checkout.getDate()+1);
			$scope.checkout = new Date(checkout);
		}
		//called to recalculate estimated cost after a date change
		$scope.change();
	}
	
	//function to be called to calculate estimated cost
	$scope.change = function() {
		$scope.nightCount = Math.round(Math.abs(($scope.checkout.getTime() - $scope.checkin.getTime())/(oneDay)));
		$scope.warning = [];
		$scope.cost = 0;
		if($scope.petCount >0){
			$scope.warning.push("**Pets are only allowed on the ground floor so that cleaning is easier to perform if necessary.");
			$scope.showWarning = true;
		}
		if($scope.accessibility >0){
			$scope.warning.push("*Only ground floor rooms are handicap accessible.");
			$scope.showWarning = true;
		}
		if($scope.bedCount != ""){
			$scope.showRoom = true;
			if($scope.petCount >0 || $scope.accessibility >0){
				$scope.room = "Ground";
			}else{
				$scope.room = "Ground or First";
			}
			if($scope.bedCount == 1){
				$scope.cost += $scope.nightCount * 50;
			}else if($scope.bedCount == 2){
				$scope.cost += $scope.nightCount * 75;
			}else if($scope.bedCount == 3){
				$scope.cost += $scope.nightCount * 90;
			}
			$scope.cost += $scope.petCount * 20;
		}
	}
} ]);
