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
    .controller('ReviewController', ['$scope', '$stateParams', 'reviews',
        function($scope, $stateParams, reviews){
            $scope.reviewPage = 1;
            $scope.pageSize = 5;
            $scope.reviewResults = {};

            $scope.$watch('reviewPage', function() {
                // show loading message
                $scope.showLoading = true;
                // reviews for a product
                reviews.fetch({
                    product_id: $stateParams.id,
                    page: $scope.reviewPage,
                    page_size: $scope.pageSize
                }, function(result) {
                    $scope.reviewResults = result;
                    // calculate total page count
                    $scope.totalPages = Math.ceil($scope.reviewResults.totalReviewCount / $scope.pageSize);
                    // hide loading message
                    $scope.showLoading = false;
                });
            });
        }
    ]);
