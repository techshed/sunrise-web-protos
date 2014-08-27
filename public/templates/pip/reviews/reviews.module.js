/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */

angular.module('hdProWeb.pip.reviews', ['ui.router'])

    // Location of the Partials
    .constant('hdProWeb.pip.reviews.Partials', '/static/core/app/pip/reviews/partials')

    // Configure the UI states and URLs
    .config(['$stateProvider', 'hdProWeb.pip.reviews.Partials',
            function($stateProvider, Partials) {

            $stateProvider.state('product.reviews', {
                url: '/reviews',
                controller: 'ReviewController',
                templateUrl: Partials + '/reviews.html'
            });
        }
    ]);
