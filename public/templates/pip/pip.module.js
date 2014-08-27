/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */
angular.module('hdProWeb.pip', ['ui.router', 'hdProWeb.pip.reviews'])

    // Location of the Partials
    .constant('hdProWeb.pip.Partials', '/static/core/app/pip/partials')

    // Configure the UI states and URLs
    .config(['$stateProvider', 'hdProWeb.pip.Partials', function($stateProvider, Partials) {

            $stateProvider.state('product', {
                url: '/product/:id',
                templateUrl: Partials + '/pip.html',
                controller: 'PipController',
                data: {
                    showCloseButton: false
                },
                onEnter: ['$state', '$timeout', function($state, $timeout) {
                    // onEnter runs earlier than we need, and $state is not ready
                    // at the moment. This seems like a bug with the system, running
                    // the code at the end of the stack resolves the issue.
                    $timeout(function(){
                        if ($state.is('product')) {
                            $state.go('product.specifications', {}, {
                                location: false
                            });
                        }
                    });
                }]
            })

            .state('product.specifications', {
                url: '/specifications',
                templateUrl: Partials + '/pip.specifications.html',
                data: {
                    showCloseButton: false
                }
            })

            .state('product.overview', {
                url: '/overview',
                templateUrl: Partials + '/pip.overview.html',
                data: {
                    showCloseButton: false
                }
            })

            .state('product.safety', {
                url: '/safety',
                templateUrl: Partials + '/pip.safety.html',
                data: {
                    showCloseButton: false
                }
            });

        }
    ]);
