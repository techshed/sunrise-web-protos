/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */

angular.module('hdProWeb.pip.reviews')
    .directive('hdReviewDistribution', ['hdProWeb.pip.reviews.Partials',
        function(Partials) {
            return {
                scope: {
                    distribution: '=',
                    average: '=',
                    total: '='
                },
                link: function(scope, element, attrs) {

                },
                templateUrl: Partials + '/review-distribution.html'
            };
        }
    ]);
