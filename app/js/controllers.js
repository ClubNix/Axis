'use strict';

angular.module('axis.controllers', [])
    .controller('AuthController', ['$scope', 'dimensionApi', function($scope, dimensionApi) {
        $scope.login = function() {
            dimensionApi.checkPassword($scope.userLogin, $scope.userPassword, function(valid_credentials) {
                if(valid_credentials) {
                    $scope.$apply(function(){
                        $scope.logged = true;
                    });
    
                    localStorage.setItem('account.valid', valid_credentials);
                    localStorage.setItem('account.login', $scope.userLogin);
                    localStorage.setItem('account.password', $scope.userPassword);
                }
            });
        };
        $scope.logout = function() {
            $scope.logged = false;

            localStorage.clear();
        };
        $scope.updateSession = function() {
            if(localStorage.getItem('account.valid') && !$scope.logged) {
                $scope.logged = true;
                $scope.userLogin = localStorage.getItem('account.login');
                $scope.userPassword = localStorage.getItem('account.password');
            }
        
        };
    }])
    .controller('MarksController', ['$scope', 'dimensionApi', function($scope, dimensionApi) {
        $scope.marks = [];

        $scope.refreshMarks = function() {
            if($scope.marks.length == 0) {
                if(localStorage.getItem('account.valid')) {
                    dimensionApi.loadMarks(
                        localStorage.getItem('account.login'),
                        localStorage.getItem('account.password'),
                        function (marks) {
                            $scope.$apply(function() {
                                $scope.marks = marks;
                            });
                        }
                    );
                }
            }
        };
    }]);

