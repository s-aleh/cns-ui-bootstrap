'use strict';

angular.module('App', ['cns.ui.bootstrap'])
    .controller('mainCtrl', ['$scope', function($scope) {
        $scope.currentPage = 1;
        $scope.rating = 0;
    }]);