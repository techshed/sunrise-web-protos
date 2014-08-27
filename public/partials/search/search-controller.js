/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */

angular.module('hdProWeb.search')

    .controller('SearchController', ['$scope',
                                    '$stateParams',
                                    'search',
                                    'searchQuery',
                                    'Tracking',
        function($scope,
                $stateParams,
                search,
                searchQuery,
                Tracking) {

            var trackingContext = {};

            $scope.query = searchQuery.set($stateParams.q);

            $scope.results = search.fetch({ q: $stateParams.q, page_size: 24 });

            if ($scope.results) {
                trackingContext.totalResults = $scope.results.total_products;
            }
            trackingContext.query = $stateParams.q;
            Tracking.track('Search - Query', trackingContext);
        }
    ]);
