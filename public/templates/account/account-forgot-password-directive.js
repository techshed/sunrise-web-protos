/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen, Deniz Arsan
 */

angular.module('hdProWeb.account')

    .directive('hdForgotPassword', ['hdProWeb.account.Partials',
                                    'UserResource',
                                    'validationHelpers',
        function(Partials,
                UserResource,
                validationHelpers) {
            return {
                scope: {},
                link: function(scope, element, attrs) {
                    var validationOptions;

                    scope.resetPassword = function() {
                        // reset password service
                    };

                    validationOptions = {
                        trackingNamespace: 'Forgot Password'
                    };
                    validationHelpers.applyTo(scope, ['resetPassword'], validationOptions);
                },
                templateUrl: Partials + '/forgot-password-form.html'
            };
        }
    ]);
