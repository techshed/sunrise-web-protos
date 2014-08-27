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

    .controller('StoreFrontController', ['$scope', 'search', 'occupations', 'categories',

        function($scope, search, occupations, categories) {

            $scope.init = function() {
                // compile to array
                $scope.stack = [];

                // XXX: faking request with 'brushes' (recent purchases)
                $scope.recent = search.fetch({
                    q: "brushes"
                });

                // XXX: faking request with 'ladders' (suggested purchases)
                $scope.suggested = search.fetch({
                    q: "ladders"
                });

                // XXX: faking profession and sub categories
                $scope.categoryTitle = "Paint";

                categories.fetch({ id: "527893" }).then(function(data) {
                    $scope.stack.push(data);
                });
                categories.fetch({ id: "527895" }).then(function(data) {
                    $scope.stack.push(data);
                });
                categories.fetch({ id: "527893" }).then(function(data) {
                    $scope.stack.push(data);
                });
                categories.fetch({ id: "527895" }).then(function(data) {
                    $scope.stack.push(data);
                });

                // grab occupations
                $scope.occupations = occupations.fetch();
            };

            // initialize controller values
            $scope.init();

        }
    ]);
