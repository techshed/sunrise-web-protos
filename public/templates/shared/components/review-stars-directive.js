/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */

angular.module('hdProWeb')

    .constant('hdProWeb.Partials', '/static/core/app/shared/components/partials')

    .directive('hdReviewStars', ['hdProWeb.Partials', 'starRatingsImage', function(Partials, starRatingsImage) {
        return {
            scope: {
                value: '=',
                total: '='
            },
            link: function(scope, element, attrs) {
                // We need to watch this because link function
                // only get called once. and we are using ghost models
                scope.$watch('value', function() {
                    scope.src = starRatingsImage.get(scope.value);
                });
            },
            templateUrl: Partials + '/review-stars.html'
        };
    }]);
