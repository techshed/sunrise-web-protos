/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */

angular.module('hdProWeb.cart', [])
    .constant('hdProWeb.cart.Partials', '/static/core/app/cart/partials')

    // estimated height of the checkout button
    // for situations where we cannot calculate
    // the height
    .constant('hdCart.EstimatedHeight', 93)

    .directive('hdCart', ['CartResource',
                          'hdProWeb.cart.Partials',
                          'hdCart.EstimatedHeight',

        function(CartResource, Partials, EstimatedHeight) {

            return {
                scope: {
                    mobile: '='
                },
                templateUrl: Partials + '/cart.html',

                link: function(scope, element, attrs) {
                    var edit = {};

                    scope.cartModel = CartResource.getCartModel();

                    scope.setEdit = function(item, value) {
                        edit[item.id] = value;
                    };

                    scope.getEdit = function(item) {
                        return edit[item.id];
                    };

                    var adjustCartHeight = function() {
                        var headerHeight = $('.Header').outerHeight() || $('.MobileNav').outerHeight(),
                            buttonHeight = $('.CartCheckout').outerHeight() || EstimatedHeight;

                        $('.CartContents--filled').css('height', $(window).height() - (headerHeight + buttonHeight));
                    };

                    $(window).on('resize', function() {
                        adjustCartHeight();
                    });

                    $(element).hover(function(){
                        $('body').css('overflow', 'hidden');
                    }, function(){
                        $('body').css('overflow', '');
                    });

                    $(element).addClass('Cart');

                    scope.$watch('cartModel', function() {
                        // window.cart = scope.cart;
                        adjustCartHeight();
                    }, true);
                }
            };
        }
    ]);
