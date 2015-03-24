'use strict';

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
