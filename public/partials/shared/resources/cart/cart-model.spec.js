/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */
describe('Cart Model', function() {
    beforeEach(module('hdProWeb'));
    var Model;

    beforeEach(inject(function(CartModel) {
        Model = CartModel;
    }));

    it('should create a ghost model when no data is provided', function() {
        var model = new Model();

        expect(Array.isArray(model.items)).toBe(true);
        expect(model.cartSubtotal).toBe('$0.00');
        expect(model.itemCount).toBe(0);
    });

    it('should create a populated model when parsed data is passed', function() {
        var model = new Model({
            storeId: '680',
            cartSubtotal: '$10.00'
        });

        expect(model.storeId).toBe('680');
        expect(model.cartSubtotal).toBe('$10.00');
    });

    describe('Update Method', function() {

        it('should update the model with passed data', function() {

            var model = new Model();

            model.update({
                storeId: '680',
                cartSubtotal: '$10.00'
            });

            expect(model.storeId).toBe('680');
            expect(model.cartSubtotal).toBe('$10.00');
        });

        it('shouldn not update the model with undefined or function values', function() {
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
