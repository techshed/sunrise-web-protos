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

    .directive('hdLogin', ['hdProWeb.account.Partials',
                        'loginError',
                        'loginSuccess',
                        'UserResource',
                        'validationHelpers',
        function(Partials,
                loginError,
                loginSuccess,
                UserResource,
                validationHelpers) {
            return {
                scope: {},
                link: function(scope, element, attrs) {
                    var validationOptions;

                    scope.login = function() {

                        UserResource.login({
                            email: scope.email,
                            password: scope.password
                        }, function(res, user){
                            loginSuccess(res, scope);
                        }, function(res){
                            loginError(res, scope);
                        });
                    };

                    validationOptions = {
                        trackingNamespace: 'Login'
                    };
                    validationHelpers.applyTo(scope, ['login'], validationOptions);
                },
                templateUrl: Partials + '/login-form.html'
            };
        }
    ])

    .factory('loginSuccess', ['$state',
                            'loginError',
                            'Tracking',
        function($state,
                loginError,
                Tracking) {
            return function loginSuccess(res, scope) {
                if (res.success) {
                    Tracking.register({
                        "email": scope.email
                    });
                    Tracking.track('Login - Success');
                    scope.email = "";
                    scope.password = "";
                    scope.form.$setPristine();
                    $state.go('storeFront');
                } else {
                    loginError({data: res});
                }
            };
        }
    ])

    .factory('loginError', ['$dialogs',
                            'Tracking',
        function($dialogs,
                Tracking) {
            return function loginError(res, scope) {
                if (res.data.errors) {
                    Tracking.track('Login - Error', res.data.errors[0]);
                    $dialogs.error('Error', res.data.errors[0].message);
                } else {
                    $dialogs.error('Error', 'Login Failed');
                }
            };
        }
    ]);
