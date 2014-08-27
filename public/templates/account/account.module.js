/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */
angular.module('hdProWeb.account', ['ui.router'])

    .constant('hdProWeb.account.Partials', '/static/core/app/account/partials')

    .config(['$stateProvider', 'hdProWeb.account.Partials', function($stateProvider, Partials) {

        $stateProvider.state('login', {
            url: '/login',
            templateUrl: Partials + '/login.html',
            controller: 'AccountController',
            data: {
                showCloseButton: false
            }
        })

        .state('register', {
            url: '/register',
            templateUrl: Partials + '/register.html',
            controller: 'AccountController',
            data: {
                showCloseButton: false
            }
        })

        .state('forgotPassword', {
            url: '/forgot-password',
            templateUrl: Partials + '/forgot-password.html',
            controller: 'AccountController',
            data: {
                showCloseButton: false
            }
        });
    }]);
