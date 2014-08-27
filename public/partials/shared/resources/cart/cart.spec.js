/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */
describe("Cart Resource", function() {

    var resource, backend, cartSuccess, cartFail, service, product;

    beforeEach(module('hdProWeb'));
    beforeEach(module(function($provide) {
        service = {
            cartParser: function(data, model) {
                model.update({
                    "items": [{
                        "id": 410933084,
                        "store_id": null,
                        "product": {
                            "id": 202523589
                        },
                        "fulfillment": "BOPIS",
                        "quantity": 1,
                        "storeId": "0628"
                    }],
                    "storeId": 628,
                    "success": true,
                    "cartSubtotal": "$0.00",
                    "lastModifiedDate": "2014-07-15T16:58:25.281",
                    "itemCount": 1,
                    "inStoreItemCount": 1,
                    "sections": [{
                        "title": "Pick up today",
                        "fulfillment": "BOPIS",
                        "cartItems": [{
                            "id": 410933084,
                            "store_id": null,
                            "product": {
                                "id": 202523589
                            },
                            "fulfillment": "BOPIS",
                            "quantity": 1,
                            "storeId": "0628"
                        }]
                    }],
                    "id": 201743537,
                    "subtotal": "$13.98"
                });
            }
        };

        spyOn(service, 'cartParser').andCallThrough();
        $provide.value('cartParser', service.cartParser);
    }));

    beforeEach(inject(function($httpBackend, CartResource) {
        backend = $httpBackend;
        resource = CartResource;
        product = {id: 202523589};
        // Set if before each test so that we can reset it.
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
        },
        cartFail = {
            success: false
        };

    }));

    it('should have working loading methods working', function() {
        backend.expectPOST('/api/v1/cart/?quantity=1').respond(cartSuccess);
        expect(resource.isLoading(product)).not.toBe(true);
        resource.addProduct(product);
        expect(resource.isLoading(product)).toBe(true);
        backend.flush();
        expect(resource.isLoading(product)).not.toBe(true);
    });

    it("should get cart item by product id", function() {
        backend.expectGET('/api/v1/cart/').respond(cartSuccess);
        resource.getCartModel();
        backend.flush();

        var response = resource.getCartItemByProductId(product.id);
        expect(response.id).toBe(410933084);
    });

    it("should get quantity of an item", function() {
        backend.expectGET('/api/v1/cart/').respond(cartSuccess);
        resource.getCartModel();
        backend.flush();

        var response = resource.getQuantity(product);
        expect(response).toBe(1);
    });

    it("should increment quantity of an item", function() {
        backend.expectGET('/api/v1/cart/').respond(cartSuccess);
        resource.getCartModel();
        backend.flush();

        resource.incrementQuantity(product);
        expect(resource.getQuantity(product)).toBe(2);
    });

    it("should decrement quantity of an item", function() {
        backend.expectGET('/api/v1/cart/').respond(cartSuccess);
        resource.getCartModel();
        backend.flush();

        resource.decrementQuantity(product);
        expect(resource.getQuantity(product)).toBe(0);
    });

    it("should remove item by setting qty to 0", function() {
        backend.expectGET('/api/v1/cart/').respond(cartSuccess);
        resource.getCartModel();
        backend.flush();

        resource.removeProduct(product);
        expect(resource.getQuantity(product)).toBe(0);
    });



    describe('has product', function() {
        it("should return true if product is in cart", function() {
            backend.expectGET('/api/v1/cart/').respond(cartSuccess);
            resource.getCartModel();
            backend.flush();

            var response = resource.hasProduct(product);
            expect(response).toBe(true);
        });

        it("should return false if product is not in cart", function() {
            backend.expectGET('/api/v1/cart/').respond(cartSuccess);
            resource.getCartModel();
            backend.flush();

            var response = resource.hasProduct({id: 15});
            expect(response).toBe(false);
        });
    });


    describe("Get Details", function() {
        var apiurl = '/api/v1/cart/',
            method = 'GET',
            action = 'getCartModel';

        it('should call parser on success', function() {
            backend['expect'+method](apiurl).respond(cartSuccess);
            resource[action](product);
            backend.flush();
            expect(service.cartParser).toHaveBeenCalled();
        });

        it('should call error handler fail', function() {
            backend['expect'+method](apiurl).respond(cartFail);
            spyOn(resource, '_handleError');
            resource[action](product);
            backend.flush();
            expect(resource._handleError).toHaveBeenCalled();
        });
    });

    describe("Add to cart", function() {
        var apiurl = '/api/v1/cart/?quantity=1',
            method = 'POST',
            action = 'addProduct';

        it('should call parser on success', function() {
            backend['expect'+method](apiurl).respond(cartSuccess);
            resource[action](product);
            backend.flush();
            expect(service.cartParser).toHaveBeenCalled();
        });

        it('should call error handler fail', function() {
            backend['expect'+method](apiurl).respond(cartFail);
            spyOn(resource, '_handleError');
            resource[action](product);
            backend.flush();
            expect(resource._handleError).toHaveBeenCalled();
        });
    });

    describe("Update Cart Item", function() {
        var apiurl = '/api/v1/cart/',
            method = 'PUT',
            action = 'updateCartItem';

        it('should call parser on success', function() {
            backend['expect'+method](apiurl).respond(cartSuccess);
            resource[action](product);
            backend.flush();
            expect(service.cartParser).toHaveBeenCalled();
        });

        it('should call error handler fail', function() {
            backend['expect'+method](apiurl).respond(cartFail);
            spyOn(resource, '_handleError');
            resource[action](product);
            backend.flush();
            expect(resource._handleError).toHaveBeenCalled();
        });
    });

    describe("Update Cart Items", function() {
        var apiurl = '/api/v1/cart/',
            method = 'PUT',
            action = 'updateCartItems';

        it('should call parser on success', function() {
            backend['expect'+method](apiurl).respond(cartSuccess);
            resource[action]([product]);
            backend.flush();
            expect(service.cartParser).toHaveBeenCalled();
        });

        it('should call error handler fail', function() {
            backend['expect'+method](apiurl).respond(cartFail);
            spyOn(resource, '_handleError');
            resource[action]([product]);
            backend.flush();
            expect(resource._handleError).toHaveBeenCalled();
        });
    });

});
