/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Caner Balci
 */

angular.module('hdProWeb')

    .directive('hdProductRowList', ['hdProWeb.Partials', function(Partials) {
        return {
            scope: {
                products: '=',
                mode: '=?'
            },
            link: function(scope, element, attrs) {

                if (!scope.mode) {
                    scope.mode = 'ListModeShow';
                }

                scope.onItemClicked = function(index, event) {
                    event.stopPropagation();
                };

                scope.deleteItem = function(index, event) {
                    scope.products.splice(index, 1);
                };
            },
            templateUrl: Partials + '/product-row-list.html'
        };
    }]);
