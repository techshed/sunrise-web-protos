/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */

angular.module('hdProWeb.search', ['ui.router'])

    .constant('hdProWeb.search.Partials', '/static/core/app/search/partials')

    .config(['$stateProvider', 'hdProWeb.search.Partials', function($stateProvider, Partials) {
        $stateProvider.state('search', {
            url: '/search/?q',
            templateUrl: Partials + '/search.html',
            controller: 'SearchController',
            data: {
                showCloseButton: false
            }
        });
    }]);
