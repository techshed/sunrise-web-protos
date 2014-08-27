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
    .directive('hdReviewPagination', ['hdProWeb.pip.reviews.Partials',
        function(Partials) {
            return {
                link: function(scope, element, attrs) {

                    var setDisabledStates = function() {
                        if (scope.reviewPage <= 1) {
                            scope.reviewPage = 1;
                            scope.prevDisabled = true;
                        } else {
                            scope.prevDisabled = false;
                        }

                        if (scope.reviewPage >= scope.totalPages) {
                            scope.reviewPage = scope.totalPages;
                            scope.nextDisabled = true;
                        } else {
                            scope.nextDisabled = false;
                        }

                        if (scope.showLoading) {
                            scope.prevDisabled = true;
                            scope.nextDisabled = true;
                        }
                    };

                    setDisabledStates();

                    scope.prevPage = function(){
                        scope.reviewPage--;
                        setDisabledStates();
                    };

                    scope.nextPage = function(){
                        scope.reviewPage++;
                        setDisabledStates();
                    };

                    // Disable button when loading next page
                    // and enable back when loading completed.
                    scope.$watch('showLoading', function(){
                        setDisabledStates();
                    });
                },

                templateUrl: Partials + '/review-pagination.html'
            };
        }
    ]);
