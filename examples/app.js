'use strict';

angular.module('App', ['cns.ui.bootstrap'])
    .controller('mainCtrl', ['$scope', function($scope) {
        $scope.work = 'work';
    }]);