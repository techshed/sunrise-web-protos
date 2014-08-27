/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */

describe('User Model', function() {

    var Model;

    beforeEach(module('hdProWeb'));

    beforeEach(inject(function(UserModel) {
        Model = UserModel;
    }));

    it('should create a ghost model when no data is provided', function() {
        var model = new Model();

        expect(model.firstName).toBe('');
        expect(model.zipCode).toBe(0);
    });

    it('should create a populated model when parsed data is passed', function() {
        var model = new Model({
            firstName: 'test',
            zipCode: 10
        });

        expect(model.firstName).toBe('test');
        expect(model.zipCode).toBe(10);
    });

    describe('User Model Update', function() {
        it('should update the model with passed data', function() {

            var model = new Model();

            model.update({
                firstName: 'test',
                zipCode: 10
            });

            expect(model.firstName).toBe('test');
            expect(model.zipCode).toBe(10);
        });

        it('shouldn not update the model with undefined or function values', function() {
            var model = new Model();

            model.update({
                firstName: 'test'
            });
            expect(model.firstName).toBe('test');

            model.update({
                firstName: undefined
            });
            expect(model.firstName).toBe('test');

            model.update({
                firstName: function() {}
            });
            expect(model.firstName).toBe('test');

        });
    });

});
