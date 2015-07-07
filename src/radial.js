(function(angular){
	
	var checkValue = function(value, defaultValue) {
		if (!value) {
			// To be strict with value = 0;
			return defaultValue;
		}
		return parseInt(value, 10);
	}
	
	var radialDirective = ['$timeout', function($timeout) {
	  return {
	    restrict: 'E',
	    scope: {
		  delay: '@',
		  from: '@',
		  max: '@',
	      r: '@',
	      stroke: '@',
	      value: '@'
	    },
        controller: ['$scope', '$element', function($scope, $element){
			// Add radial class
			$element.addClass('radial');
			
			// Default values definitions
			$scope.delay = checkValue($scope.delay, 10);
			$scope.from = checkValue($scope.from, 0);
			$scope.max = checkValue($scope.max, 100);
			$scope.r = checkValue($scope.r, 50);
			$scope.stroke = checkValue($scope.stroke, 2);
			$scope.value = checkValue($scope.value, 25);
			
			// Calculate other values
 			$scope.size = $scope.r*2 + $scope.stroke;
			$scope.perimeter = Math.PI*2*$scope.r;
			$scope.offset = (($scope.max-$scope.from)/$scope.max)*$scope.perimeter;
        }],
		link: function(scope) {
			// Animate or not depending of the delay
			var animate = function() {
				scope.offset = ((scope.max-scope.value)/scope.max)*scope.perimeter;
			}
			if(scope.delay < 10) {
				animate();
			}else{
				$timeout(animate, scope.delay)
			}
		},
		templateUrl: function(elem, attrs) {
			return attrs.template || '../src/radial.html';
		},
		transclude: true,
	  };
	}];
	
	angular.module('radial', []).directive('radial', radialDirective);
})(angular);