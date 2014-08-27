/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Ben Clark
 */

describe("ProductCard add button directive", function() {

    var el,
        backend,
        scope,
        dummySku = '123456',
        dummyStock = '9000',
        cartSuccess = {
            "line_items": [{
                "store_id": "0628",
                "product": {
                    "title": "Heavy-Duty Deck Scrub Brush",
                    "price": "$13.98",
                    "thumbnail_url": "TODO",
                    "id": 202523589,
                    "inventory_count": 9
                },
                "line_item_id": 410933084,
                "fulfillment": "BOPIS",
                "quantity": 1
            }],
            "store_id": 628,
            "success": true,
            "cart_subtotal": "$25.92",
            "consistent": true,
            "last_modified_date": "2014-07-16T16:09:19.856",
            "item_count": 3,
            "in_store_item_count": 2,
            "sections": [{
                "line_items": [{
                    "store_id": "0628",
                    "product": {
                        "title": "Heavy-Duty Deck Scrub Brush",
                        "price": "$13.98",
                        "thumbnail_url": "TODO",
                        "id": 202523589,
                        "inventory_count": 9
                    },
                    "line_item_id": 410933084,
                    "fulfillment": "BOPIS",
                    "quantity": 1
                }],
                "fulfillment_option": "BOPIS",
                "title": "Pick up today"
            }],
            "cart_id": 201743537
        };

    beforeEach(function() {
        module('hdProWeb');jasmine.createSpy('cartgetCartModel');
        module('templates');
    });

    beforeEach(inject(function($compile, $rootScope, $httpBackend, ApiRoot) {
        backend = $httpBackend;
        scope = $rootScope;
        el = angular.element('<div add-to-cart-button ' +
                                  'data-product="product" ' +
                                  'data-big-button="true" ' +
                                  'data-stock="product.inventoryCount"></div>');
        scope.product = {
            id: 15,
            inventoryCount: 2
        };
        backend.expectGET(ApiRoot + '/cart/').respond(cartSuccess);
        scope.$apply();
        el = $compile(el)(scope);
        scope.$digest();
        backend.flush();
    }));

    it("should change count var when the steppers are clicked", function() {
        expect(el.isolateScope().count).toBe(0);
        el.isolateScope().increaseCount();
        el.isolateScope().$digest();
        expect(el.isolateScope().count).toBe(1);
        el.isolateScope().decreaseCount();
        el.isolateScope().$digest();
        expect(el.isolateScope().count).toBe(0);
    });

    it("should change the stepperShown var when triggered", function() {
        el.isolateScope().stepperShown = false;
        el.isolateScope().showStepper();
        el.isolateScope().$digest();
        expect(el.isolateScope().stepperShown).toBe(true);
    });
});
