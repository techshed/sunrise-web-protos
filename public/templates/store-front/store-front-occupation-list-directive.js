/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Ben Clark
 */

angular.module('hdProWeb.storeFront')

    .directive('hdOccupationList', ['hdProWeb.storeFront.Partials', function(Partials) {
        return {
            scope: {
                occupations: '='
            },
            templateUrl: Partials + '/store-front.occupation-list.html'
        };
    }]);
