/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */

describe('Product Model', function() {

    var Model;

    beforeEach(module('hdProWeb'));

    beforeEach(inject(function(Product) {
        Model = Product;
    }));

    it('should create a ghost model when no data is provided', function() {
        var model = new Model();

        expect(model.title).toBe('');
        expect(model.price).toBe(null);
        expect(model.originalPrice).toBe(null);
        expect(model.thumbnailUrl).toBe('http://placehold.it/65');
    });

    it('should have empty property true when no data is provided', function() {
        var model = new Model();

        expect(model.empty).toBe(true);
    });

    it('should create a populated model when parsed data is passed', function() {
        var model = new Model({
            title: 'test',
            price: 10,
            specialPrice: 11,
            thumbnailUrl: 'url'
        });

        expect(model.title).toBe('test');
        expect(model.price).toBe(10);
        expect(model.specialPrice).toBe(11);
        expect(model.thumbnailUrl).toBe('url');
    });

    describe('Product Model Update', function() {
        it('should update the model with passed data', function() {

            var model = new Model();

            model.update({
                title: 'test',
                price: 10,
                specialPrice: 11,
                thumbnailUrl: 'url'
            });

            expect(model.title).toBe('test');
            expect(model.price).toBe(10);
            expect(model.specialPrice).toBe(11);
            expect(model.thumbnailUrl).toBe('url');

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
