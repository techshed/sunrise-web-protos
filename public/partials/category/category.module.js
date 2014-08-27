// Copyright 2014 Red Beacon, Inc.  All Rights Reserved
//
// This code, and all derivative work, is the exclusive property of
// Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
// authorization.
//
// Author: Ben Clark
//

angular.module('hdProWeb.category', ['ui.bootstrap'])

    .constant('hdProWeb.category.Partials', '/static/core/app/category/partials')

    .config(['$stateProvider', 'hdProWeb.category.Partials', function($stateProvider, Partials) {
        $stateProvider.state('category', {
            url: '/category/:categoryId',
            templateUrl: Partials + '/category.html',
            controller: 'CategoryController',
            data: {}
        });
    }]);
