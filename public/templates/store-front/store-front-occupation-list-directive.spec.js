/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Ben Clark
 */

describe("Occupation List directive", function (){

    var el,
        scope;

    beforeEach(function() {
        module('hdProWeb');
        module('templates');
    });

    describe("Rendering the OccupationList directive", function() {

        var dummyDataSet = ['test1', 'test2', 'test3', 'test4', 'test5', 'test6'];

        beforeEach(inject(function($compile, $rootScope) {
            scope = $rootScope.$new();
            el = angular.element('<div hd-occupation-list occupations="dummyList"></div>');
            scope.dummyList = dummyDataSet;
            scope.$apply();
            el = $compile(el)(scope);
            scope.$digest();
        }));

        it("should render the passed data", function() {
            // check occupation fields
            expect(el.html()).toContain('test1');
            expect(el.html()).toContain('test2');
            expect(el.html()).toContain('test3');
            expect(el.html()).toContain('test4');
            expect(el.html()).toContain('test5');
            expect(el.html()).toContain('test6');
        });

    });
});
