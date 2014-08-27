// Copyright 2014 Red Beacon, Inc.  All Rights Reserved
//
// This code, and all derivative work, is the exclusive property of
// Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
// authorization.
//
// Author: Ben Clark
//

angular.module('hdProWeb.header')

    .controller('CategoryDropdownController', ['$element',
                                               '$scope',
                                               '$state',
                                               'categories',

        function($element, $scope, $state, categories) {

            $scope.showSubcategories = false;
            $scope.subcategoryCache = {};
            $scope.categories = {};
            $scope.categories.subcategories = {};

            $scope.currentCategoryId = '';

            $scope.init = function() {
                 categories.fetch().then(function(data) {
                    $scope.categories = data;
                    _.each($scope.categories.subcategories, function(value, index, array) {
                        categories.fetch({ id: value.id }).then(function(data) {
                            $scope.subcategoryCache[value.id] = data.subcategories;
                        });
                    });
                });
            };

            $scope.displaySubcategories = function(categoryId) {
                $scope.currentCategoryId = categoryId;
                $scope.showSubcategories = true;
                $scope.subcategories = $scope.subcategoryCache[categoryId];
            };

            $scope.toggled = function(open) {
                if (!open) {
                    $scope.showSubcategories = false;
                    $scope.currentCategoryId = '';
                }
            };

            $scope.directToCategory = function(categoryId) {
                $state.go('category', { categoryId: categoryId }, { reload: true });
            };

            // initialize scope
            $scope.init();
        }
    ]);
