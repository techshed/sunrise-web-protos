/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Ben Clark
 */

angular.module('hdProWeb.plp')

    .directive('hdProductList', ['hdProWeb.plp.Partials', function(Partials) {
        return {
            scope: {
                products: '=',
                title: '@',
                totalProducts: '='
            },
            templateUrl: Partials + '/plp.product-list.html'
        };
    }]);
