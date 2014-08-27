/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Ben Clark
 */

angular.module('hdProWeb.header')

    .controller('MobileHeaderController', ['$rootScope', '$scope', '$state',
        function($rootScope, $scope, $state) {
            var stateHandler = function(event, toState, toParams, fromState, fromParams) {

                // if state data.header is present
                if ($state.current.data) {
                    var data = $state.current.data;

                    // check for new page title
                    if (data.pageTitle) {
                        $scope.showTitle = true;
                        $scope.title = data.pageTitle;
                    } else {
                        $scope.showTitle = false;
                        $scope.title = '';
                    }

                    // check for page title
                    $scope.showCloseButton = data.showCloseButton;

                } else {
                    // resets values to default if no header object is present
                    $scope.title = '';
                    $scope.showCloseButton = false;
                }

            };
            var stateListener = $rootScope.$on('$stateChangeSuccess', stateHandler);

            $scope.title = '';
            $scope.showTitle = false;
            $scope.showCloseButton = false;

            // emit back button pressed event for controller pickup
            $scope.backButtonPressed = function() {
                $rootScope.$emit('MobileHeader.BackButtonPressed');
                $scope.showCloseButton = false;
            };

            // unbind
            // ======
            $scope.$on('$destroy', function() {
                stateListener();
            });
        }
    ]);
