'use strict';

angular.module('cns.ui.bootstrap', ['cns.ui.bootstrap.pagination', 'cns.ui.bootstrap.pager', 'cns.ui.bootstrap.rating'])
    .constant('MODULE_VERSION', '0.0.1');

'use strict';

angular.module('cns.ui.bootstrap.pagination', [])
    .constant('cfgPagination', {
        currentPage: 1,
        range: 5,
        text: {
            prev: '\u003c',
            next: '\u003e',
            first: '\u00ab',
            last: '\u00bb'
        }
    })
    .controller('PaginationController', ['$scope', '$attrs', 'cfgPagination', function($scope, $attrs, cfgPagination) {
        this.init = function() {
            $scope.show = {};
            $scope.show.first = angular.isDefined($attrs.noFirst) ? false : true;
            $scope.show.prev = angular.isDefined($attrs.noPrev) ? false : true;
            $scope.show.next = angular.isDefined($attrs.noNext) ? false : true;
            $scope.show.last = angular.isDefined($attrs.noLast) ? false : true;
            $scope.text = {};
            $scope.text.first = angular.isDefined($attrs.firstText) ? $attrs.firstText : cfgPagination.text.first;
            $scope.text.prev = angular.isDefined($attrs.prevText) ? $attrs.prevText : cfgPagination.text.prev;
            $scope.text.next = angular.isDefined($attrs.nextText) ? $attrs.nextText : cfgPagination.text.next;
            $scope.text.last = angular.isDefined($attrs.lastText) ? $attrs.lastText : cfgPagination.text.last;
            $scope.bootstrapClass = angular.isDefined($attrs.bootstrapClass) ? $attrs.bootstrapClass : '';
        };
        $scope.setCurPage = function(event, page) {
            event.preventDefault();
            switch(page) {
                case 'first':
                    $scope.ngModel = 1;
                    break;
                case 'prev':
                    $scope.ngModel = ($scope.ngModel > 1) ? $scope.ngModel - 1 : $scope.ngModel;
                    break;
                case 'next':
                    $scope.ngModel = ($scope.ngModel < $scope.totalPages) ? $scope.ngModel + 1 : $scope.ngModel;
                    break;
                case 'last':
                    $scope.ngModel = $scope.totalPages;
                    break;
                default:
                    $scope.ngModel = page;
                    break;
            }
        };
        $scope.$watch("totalPages", function() {
            $scope.pages = new Array($scope.totalPages);
            $scope.ngModel = ($scope.totalPages < $scope.ngModel) ? $scope.totalPages : ($scope.ngModel == 0) ? 1 : $scope.ngModel;
        });
        $scope.$watch("ngModel", function() {
            if($scope.totalPages > 10) {
                if($scope.ngModel - cfgPagination.range <= 0)
                {
                    $scope.leftPages = 1;
                    $scope.rightPages = $scope.leftPages + 2 * cfgPagination.range - 1;
                } else if($scope.totalPages - $scope.ngModel < cfgPagination.range) {
                    $scope.rightPages = $scope.totalPages;
                    $scope.leftPages = $scope.rightPages - 2 * cfgPagination.range + 1;
                } else {
                    $scope.leftPages = $scope.ngModel - cfgPagination.range;
                    $scope.rightPages = $scope.leftPages + 2 * cfgPagination.range - 1;
                }
            } else {
                $scope.leftPages = 1;
                $scope.rightPages = $scope.totalPages;
            }
        });
    }])
    .directive('cnsPagination', ['$timeout', 'cfgPagination', function($timeout, cfgPagination) {
        return {
            controller: 'PaginationController',
            link: function(scope, element, attributes, controllers) {
                var paginationCtrl = controllers[0],
                    ngModelCtrl = controllers[1];
                if(!ngModelCtrl) {
                    console.log('Pagination directive error');
                    retrun;
                }
                $timeout(function() {
                    scope.pages = new Array(Number(scope.totalPages));
                    paginationCtrl.init();
                }, 0);
            },
            restrict: 'E',
            require: ['cnsPagination', 'ngModel'],
            scope: {
                ngModel: '=',
                totalPages: '@'
            },
            templateUrl: '../src/templates/directives/pagination.html'
        };
    }]);

angular.module('cns.ui.bootstrap.pager', [])
    .constant('cfgPager', {
        curPage: 1,
        text: {
            prev: 'Previous',
            next: 'Next'
        },
        icon: {
            prev: '\u2190',
            next: '\u2192'
        }
    })
    .controller('PagerController', ['$scope', '$attrs', 'cfgPager', function($scope, $attrs, cfgPager) {
        this.init = function() {
            $scope.aligned = angular.isDefined($attrs.aligned) ? true : false;
            $scope.rotate = angular.isDefined($attrs.rotate) ? true : false;
            $scope.noIcon = angular.isDefined($attrs.noIcon) ? false : true;
            $scope.text = {};
            $scope.text.prev = angular.isDefined($attrs.prevText) ? $attrs.prevText : cfgPager.text.prev;
            $scope.text.next = angular.isDefined($attrs.nextText) ? $attrs.nextText : cfgPager.text.next;
            $scope.icon = {};
            $scope.icon.prev = angular.isDefined($attrs.prevIcon) ? $attrs.prevIcon : cfgPager.icon.prev;
            $scope.icon.next = angular.isDefined($attrs.nextIcon) ? $attrs.nextIcon : cfgPager.icon.next;
        };
        $scope.setCurPage = function(event, page) {
            event.preventDefault();
            switch(page) {
                case 'prev':
                    $scope.ngModel = ($scope.ngModel > 1) ? $scope.ngModel - 1 :
                        $scope.rotate ? $scope.totalPages : $scope.ngModel;
                    break;
                case 'next':
                    $scope.ngModel = ($scope.ngModel < $scope.totalPages) ? $scope.ngModel + 1 :
                        $scope.rotate ? 1 : $scope.ngModel;
                    break;
            }
        };
        $scope.$watch("totalPages", function() {
            $scope.ngModel = ($scope.totalPages < $scope.ngModel) ? $scope.totalPages : ($scope.ngModel == 0) ? 1 : $scope.ngModel;
        });
    }])
    .directive('cnsPager', [function(){
        return {
            controller: 'PagerController',
            link: function(scope, element, attributes, controllers) {
                var pagerCtrl = controllers[0],
                    ngModelCtrl = controllers[1];
                if(!pagerCtrl) {
                    console.log('Pager directive error');
                    return;
                }
                pagerCtrl.init();
            },
            restrict: 'E',
            require: ['cnsPager', 'ngModel'],
            scope: {
                ngModel: '=',
                totalPages: '@',
                textButton: '=',
                textIcon: '='
            },
            templateUrl: '../src/templates/directives/pager.html'
        };
    }]);

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
