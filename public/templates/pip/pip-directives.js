/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */
angular.module('hdProWeb.pip')

    .directive('hdThumbnails', ['hdProWeb.pip.Partials', function(Partials) {

        return {

            link: function(scope, element, attrs) {

                scope.setSelectedImage = function(img) {
                    scope.selectedImage = img;
                    scope.$watch();
                };

                scope.isSelectedImage = function(img) {
                    return img.large === scope.selectedImage.large;
                };

                scope.$watch('product.images', function(){
                    if(scope.product.images){
                        scope.selectedImage = scope.product.images[0];
                    }
                });

            },

            templateUrl: Partials + '/pip.thumbnails.html'
        };
    }])

    .directive('hdAddToCart', ['hdProWeb.pip.Partials', function(Partials) {

        return {

            link: function(scope, element, attrs) {

            },

            templateUrl: Partials + '/pip.add-to-cart.html'
        };

    }])

    .directive('hdSpecificationTable', ['hdProWeb.pip.Partials', function(Partials) {

        return {

            scope: {
                visible: '=',
                specifications: '='
            },

            link: function(scope, element, attrs) {
                scope.showSpecs = false;
                scope.visibleSpecCount = scope.visible || 5;

                scope.isSpecVisible = function(index) {
                    if (index < scope.visibleSpecCount) {
                        return true;
                    }
                    return scope.showSpecs;
                };

                scope.showAllSpecs = function() {
                    scope.showSpecs = true;
                };

                scope.columns = [];

                // watch specification changes, due to the async
                // nature of the application, specification array
                // might be undefined during the initialization of this
                // directive, to manipulate the values of this scope
                // we need to make sure specifications array is populated
                scope.$watch('specifications', function() {
                    // check if specifications actually exist
                    if (scope.specifications) {
                        // create 2 column structure
                        for (var x=0; x < scope.specifications.length; x += 2) {
                            scope.columns.push({
                                col1: scope.specifications[x],
                                col2: scope.specifications[x + 1]
                            });
                        }
                    }
                });

            },

            templateUrl: Partials + '/pip.specification-table.html'
        };

    }])

    .directive('noClickPropagation', [function() {
        return {
            link: function(scope, element, attrs) {
                element.bind('click',function(event) {
                    event.stopPropagation();
                });
            }
        };
    }]);
