/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Caner Balci
 */

angular.module('hdProWeb')

    .directive('addListToCartButton', ['$q',
                                        '$timeout',
                                        'CartResource',
                                        'hdProWeb.Partials',
                                        'Tracking',
        function($q,
                $timeout,
                CartResource,
                Partials,
                Tracking) {

            return {
                scope: {
                    products: '=',
                    total: '='
                },
                link: function(scope, element, attrs) {

                    scope.init = function() {

                        scope.cartResource = CartResource;
                        scope.adding = false;
                        scope.buttonDisabled = false;
                        scope.done = false;
                    };

                    scope.$watch('products', function() {

                        // reset the directive if products change
                        scope.init();
                    });


                    scope.addAllToCart = function() {

                        var promises,
                            totalQty = 0,
                            trackingContext = {
                                itemCount: scope.products.length,
                                subtotal: scope.total
                            };

                        _.each(scope.products, function(element, index) {
                            totalQty += element.quantity;
                        });
                        trackingContext.totalQuantity = totalQty;

                        scope.adding = true;
                        scope.buttonDisabled = true;

                        // this takes a list of product with <b>quantities</b>
                        promises = scope.products.map(function(product){
                            // we need an atomic way for adding multiple items to cart
                            // currently any exception here will
                            // leave the cart in an unwanted state ie:
                            // list partially added and no way to undo.
                            return scope.cartResource.addProduct(product, undefined, product.quantity);
                        });

                        $q.all(promises).then(function(data) {
                            scope.adding = false;
                            scope.done = true;
                            Tracking.track('Lists - Add All to Cart Success', trackingContext);
                        }, function(error) {
                            scope.adding = false;
                            scope.done = false;
                            scope.buttonDisabled = false;
                            // TODO(Caner) replace with proper modal.
                            alert("Unable to add to cart. " + error);
                            Tracking.track('Lists - Add All to Cart Error', trackingContext);
                        });
                    };

                    scope.init();

                },
                replace: true,
                templateUrl: Partials + '/add-list-to-cart-button.html'
            };
        }
    ]);
