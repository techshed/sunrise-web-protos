/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Ben Clark
 */

 angular.module('hdProWeb.storeFinder', ['ui.router'])

    .constant('hdProWeb.storeFinder.Partials', '/static/core/app/store-finder/partials')

    // Configure the UI states and URLs
    .config(['$stateProvider', 'hdProWeb.storeFinder.Partials',
        function($stateProvider, Partials) {
            $stateProvider.state('storeFinder', {
                url: '/storeFinder',
                templateUrl: Partials + '/store-finder.html',
                controller: 'StoreFinderController',
                data: {
                    pageTitle: 'Store Finder',
                    showCloseButton: false
                }
            },
            $stateProvider.state('storeDetails', {
                parent: 'storeFinder',
                data: {
                    pageTitle: 'Store Details',
                    showCloseButton: true
                }
            })
        );
    }]);
