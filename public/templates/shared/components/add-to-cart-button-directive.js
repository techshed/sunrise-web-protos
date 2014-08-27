/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Ben Clark
 */

angular.module('hdProWeb')

    .constant('FulfillmentOptions', {

        'BOPIS': 'Pickup today',
        'ShipToHome': 'Ship it free'
        // 'BOSS': 'Buy online, ship to store'
    })

    .directive('addToCartButton', ['$timeout',
                                    'CartResource',
                                    'FulfillmentOptions',
                                    'hdProWeb.Partials',
                                    'Tracking',
        function($timeout,
                    CartResource,
                    FulfillmentOptions,
                    Partials,
                    Tracking) {
            return {
                scope: {
                    product: '=',
                    noCover: '=',
                    bigButton: '=',
                    stock: '=',
                    trackingNamespace: '@'
                },
                link: function(scope, element, attrs) {

                    var timer = null,
                        track = function(name) {
                        Tracking.track(scope.trackingNamespace + " - Cart " + name, {
                            cartID: scope.cartModel.id,
                            itemCount: scope.cartModel.itemCount,
                            storeID: scope.cartModel.storeId,
                            subtotal: scope.cartModel.subtotal,
                            productID: scope.product.id
                        });
                    };

                    scope.cartResource = CartResource;
                    scope.cartModel = scope.cartResource.getCartModel();
                    scope.FulfillmentOptions = FulfillmentOptions;

                    scope.count = 0;
                    scope.stepperShown = false;


                    scope.$watch('cartModel', function() {
                        scope.count = scope.cartResource.getQuantity(scope.product);
                    }, true);


                    scope.showStepper = function() {
                        scope.stepperShown = true;
                        if (scope.count === 0) {
                            scope.count = 1;
                        }
                        triggerTimeout();
                    };

                    scope.increaseCount = function()  {
                        if (scope.count < scope.stock) {
                            scope.count = scope.count + 1;
                        }
                    };

                    scope.decreaseCount = function()  {
                        if (scope.count > 0) {
                            scope.count = scope.count - 1;
                        }
                    };

                    scope.incrementQuantity = function(product) {
                        CartResource.incrementQuantity(product);
                        track('Increment Product');
                    };

                    scope.decrementQuantity = function(product) {
                        CartResource.decrementQuantity(product);
                        track('Decrement Product');
                    };

                    scope.addToCart = function(){
                        scope.cartResource.addProduct(scope.product).then(function(success) {
                            track('Add Product Success');
                        }, function(errors) {
                            $dialogs.error('Error', errors.join('\n---\n'));
                            track('Add Product Error');
                        });
                    };

                    scope.selectFulfillment = function(fulfillment) {
                        if (!scope.product.isFulfillmentAvailable(fulfillment)) {
                            return;
                        }
                        scope.product.defaultFulfillment = fulfillment;
                    };

                    function triggerTimeout() {
                        $timeout.cancel(timer);
                        timer = $timeout(function() {
                            scope.stepperShown = false;
                        }, 3000);
                    }

                    // block event propagation to product card link
                    element.on('click', function(event) {
                        event.stopPropagation();
                        event.preventDefault();
                        triggerTimeout();
                    });
                },
                replace: true,
                templateUrl: Partials + '/add-to-cart-button.html'
            };
        }
    ]);
