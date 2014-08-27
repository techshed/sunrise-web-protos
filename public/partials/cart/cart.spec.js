/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */

describe("Cart Directive", function() {

    var el, scope, apiService, cartCount = 0;

    beforeEach(module('templates'));
    beforeEach(module('hdProWeb'));

    beforeEach(module(function($provide) {
        apiService = {
            CartResource: {
                getCartModel: function() {
                    return { itemCount: cartCount++ };
                }
            }
        };
        $provide.value('CartResource', apiService.CartResource);
    }));

    beforeEach(inject(function($compile, $rootScope) {

        scope = $rootScope;

        scope.product = {};

        el = angular.element('<div hd-cart></div>');
        el = $compile(el)(scope);
        scope.$digest();

    }));


    // Cart count starts from 0
    describe("Empty cart", function() {

        it("should display your cart is empty message", function() {
            expect(el[0].innerHTML.indexOf('Your cart is empty')).not.toBe(-1);
        });

    });

    // Before each describe, cart count increases 1
    describe("Non Empty cart", function() {

        it("should display cart items", function() {
            expect(el[0].innerHTML.indexOf('CartContents--filled')).not.toBe(-1);
        });
    });


});


