(function(angular){
	
	var checkValue = function(value, defaultValue) {
		return parseInt(value, 10) || defaultValue;
	}
	
	var radialDirective = function() {
	  return {
	    restrict: 'E',
	    scope: {
	      radius: '@',
	      value: '@',
		  max: '@',
	      stroke: '@'
	    },
        controller: function($scope, $element){
			$scope.radius = checkValue($scope.radius, 100);
			$scope.value = checkValue($scope.value, 25);
			$scope.max = checkValue($scope.max, 100);
			$scope.stroke = checkValue($scope.stroke, 2);
 			$scope.size = $scope.radius + $scope.stroke;
			$scope.perimeter = Math.PI*2*$scope.radius;
			$scope.offset = (($scope.max-$scope.value)/$scope.max)*$scope.perimeter;
        },
	    transclude: true,
	    templateUrl: '../src/radial.html'
	  };
	};
	
	angular.module('testApp').directive('radial', radialDirective);
})(angular);