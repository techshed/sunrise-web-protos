// Copyright 2014 Red Beacon, Inc.  All Rights Reserved
//
// This code, and all derivative work, is the exclusive property of
// Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
// authorization.
//
// Author: Ben Clark
//

angular.module('hdProWeb.header')

    .directive('hdCategoryDropdown', ['hdProWeb.header.Partials', function(Partials) {
        return {
            controller: 'CategoryDropdownController',
            templateUrl: Partials + '/header.category-dropdown.html'
        };
    }]);
