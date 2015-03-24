angular.module('cns.ui.bootstrap.rating', [])
    .constant('ratingCfg', {
        maxRating: 5,
        iconValued: 'glyphicon-star',
        iconUnvalued: 'glyphicon-star-empty'
    })
    .controller('RatingController', ['$scope', '$attrs', 'ratingCfg', function($scope, $attrs, ratingCfg){
        this.init = function () {
            $scope.max = angular.isUndefined($attrs.max) ? ratingCfg.maxRating : $attrs.max;
            $scope.iconValued = angular.isUndefined($attrs.iconValued) ? ratingCfg.iconValued : $attrs.iconValued;
            $scope.iconUnvalued = angular.isUndefined($attrs.iconUnvalued) ? ratingCfg.iconUnvalued : $attrs.iconUnvalued;
            $scope.values = new Array(parseInt($scope.max));
            $scope.r = Math.ceil(angular.copy($scope.rating));
        };
        $scope.keydown = function(event) {
            event.preventDefault();
            event.stopPropagation();
        };
        $scope.setRating = function(number) {
            $scope.ngModel = angular.copy(number + 1);
        };
        $scope.mouseenter = function(number) {
            $scope.r = Math.ceil(angular.copy(number + 1));
        };
        $scope.mouseleave = function() {
            $scope.r = Math.ceil(angular.copy($scope.rating));
        };
        $scope.$watch("rating", function() {
            $scope.r = Math.ceil(angular.copy($scope.rating));
        });
    }])
    .directive('cnsRating', [function() {
        return {
            controller: 'RatingController',
            link: function(scope, element, attributes, controllers) {
                var ratingCtrl = controllers[0],
                    ngModelCtrl = controllers[1];
                if(! ratingCtrl) {
                    console.log('Rating directive error');
                    return;
                }
                ratingCtrl.init();
            },
            restrict: 'E',
            require: ['cnsRating', 'ngModel'],
            scope: {
                ngModel: '=',
                rating: '@'
            },
            templateUrl: '../src/templates/directives/rating.html',
            transclude: true
        };
    }]);

