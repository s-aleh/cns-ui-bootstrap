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
