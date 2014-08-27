// Copyright 2014 Red Beacon, Inc.  All Rights Reserved
//
// This code, and all derivative work, is the exclusive property of
// Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
// authorization.
//
// Author: Ben Clark
//

angular.module('hdProWeb.header')

    .directive('hdAccountMenu', ['hdProWeb.header.Partials', 'UserResource', 'Tracking',
        function(Partials, UserResource, Tracking) {
            return {
                link: function (scope, element, attrs) {
                    scope.open = false;

                    scope.UserResource = UserResource;
                    scope.user = UserResource.user;

                    scope.$watch(function(){
                        // Check for a change when user value changes
                        return UserResource.user;
                    }, function() {
                        scope.user = UserResource.user;
                    });

                    scope.openTray = function() {
                        scope.open = true;
                    };

                    scope.closeTray = function() {
                        scope.open = false;
                    };

                    scope.logout = function() {
                        scope.UserResource.logout();
                        Tracking.unregister();
                        scope.closeTray();
                    };
                },
                scope: true,
                replace: true,
                templateUrl: Partials + '/header.account-menu.html'
            };
        }
    ]);
