/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */

describe('Cart Item Model', function() {
    var Model;

    beforeEach(module('hdProWeb'));

    beforeEach(inject(function(CartItemModel) {
        Model = CartItemModel;
    }));

    it('should create a ghost model when no data is provided', function() {
        var model = new Model();

        expect(model.id).toBe(0);
        expect(model.fulfillment).toBe('ShipToHome');
        expect(model.quantity).toBe(1);
    });

    it('should create a populated model when parsed data is passed', function() {
        var model = new Model({
            fulfillment: 'ShipToHome',
            quantity: 5
        });

        expect(model.fulfillment).toBe('ShipToHome');
        expect(model.quantity).toBe(5);
    });

    describe('Update Method', function() {

        it('should update the model with passed data', function() {
            var model = new Model();

            model.update({
                fulfillment: 'ShipToHome',
                quantity: 5
            });

            expect(model.fulfillment).toBe('ShipToHome');
            expect(model.quantity).toBe(5);
        });

        it('should not update the model with undefined or function values', function() {
            var model = new Model();

            model.update({
                title: 'test'
            });
            expect(model.title).toBe('test');

            model.update({
                title: undefined
            });
            expect(model.title).toBe('test');

            model.update({
                title: function() {}
            });
            expect(model.title).toBe('test');

        });
    });

});
