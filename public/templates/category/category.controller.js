/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Ben Clark
 */

angular.module('hdProWeb.category')

    .constant('category.productPageSize', 24)

    .controller('CategoryController', ['$scope',
                                       '$state',
                                       'CategoryStack',
                                       'device',
                                       'category.productPageSize',
                                       'search',

        function($scope,
                 $state,
                 CategoryStack,
                 device,
                 productPageSize,
                 search) {

            $scope.CategoryStack = CategoryStack;
            $scope.products = {};
            $scope.recommendations = {};
            $scope.displayMenu = true;
            $scope.displayProducts = true;


            $scope.init = function() {
                var requestedId = $state.params.categoryId;

                // $state.params returns a string value for parameters, we need ints to compare
                // against our category model. If the string is empty, this is the root.
                requestedId = (requestedId === "") ? "" : parseInt(requestedId, 10);
                CategoryStack.browseTo(requestedId);

            };

            $scope.getCategory = function(categoryId) {
                $state.go('category', { categoryId: categoryId });
            };

            $scope.getPreviousCategory = function(categoryId) {
                $state.go('category', { categoryId: categoryId });
            };

            $scope.fetchProducts = function(categoryId) {
                $scope.products = search.fetch({
                    category_id: categoryId,
                    store_id: '',
                    page_size: productPageSize
                });

                // XXX faking request for certona items with "hammers"
                $scope.recommendations = search.fetch({
                    q: "hammers"
                });
            };

            function setDisplayFlags() {
                var currentCategoryIsLeafNode = CategoryStack.current.isLeafCategory();
                $scope.displayMenu = !currentCategoryIsLeafNode;
                $scope.displayProducts = !device.isMobile || currentCategoryIsLeafNode;
            }

            $scope.init();

            var unbindCurrentWatch = $scope.$watch('CategoryStack.current',
                function(newValue, oldValue) {
                    setDisplayFlags();
                    if ($scope.displayProducts) {
                        $scope.fetchProducts(CategoryStack.current.id);
                    }
                }
            );
            $scope.$on('$destroy', unbindCurrentWatch);
        }
    ]);
