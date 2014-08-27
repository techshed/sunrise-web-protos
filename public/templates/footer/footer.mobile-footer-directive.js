/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Ben Clark, Deniz Arsan
 */

angular.module('hdProWeb.footer')

    .directive('hdMobileFooter', ['hdProWeb.footer.Partials', function(Partials) {
        return {
            templateUrl: Partials + '/footer.mobile-footer.html'
        };
    }]);
