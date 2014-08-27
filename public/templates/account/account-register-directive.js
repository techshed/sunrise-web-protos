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

    .directive('hdRegister', ['hdProWeb.account.Partials',
                            'registerResponseHandler',
                            'UserResource',
                            'validationHelpers',
        function(Partials,
                registerResponseHandler,
                UserResource,
                validationHelpers) {
            return {
                scope: {},
                link: function(scope, element, attrs) {
                    var validationOptions;

                    scope.register = function() {

                        UserResource.register({
                            first_name: scope.firstName,
                            last_name: scope.lastName,
                            email: scope.email,
                            zipcode: scope.zipcode,
                            password: scope.password
                        }, function(res){
                            registerResponseHandler(res, scope);
                        }, function(res){
                            registerResponseHandler(res, scope);
                        });
                    };

                    validationOptions = {
                        trackingNamespace: 'Register'
                    };
                    validationHelpers.applyTo(scope, ['register'], validationOptions);
                },
                templateUrl: Partials + '/register-form.html'
            };
        }
    ])

    .factory('registerResponseHandler', ['$dialogs',
                                        '$state',
                                        'Tracking',
        function($dialogs,
                $state,
                Tracking) {
            return function registerResponseHandler(res, scope){
                if (res.success) {
                    Tracking.register({
                        "name": [scope.firstName, scope.lastName].join(' '),
                        "email": scope.email
                    });
                    Tracking.track('Register - Success');
                    scope.confirmPassword = "";
                    scope.password = "";
                    $state.go('storeFront');
                } else {
                    Tracking.track('Register - Error', res.errors[0]);
                    $dialogs.error('Error', res.errors[0].message);
                }
            };
        }
    ]);
