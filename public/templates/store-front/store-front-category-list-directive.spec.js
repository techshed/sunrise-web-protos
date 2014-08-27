/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Ben Clark
 */

describe("Category List directive", function () {

    var el,
        scope;

    beforeEach(function() {
        module('hdProWeb');
        module('templates');
    });

    // dummy data
    var dummyTitle = 'Test Title',
        dummyDataSet = [
            {
                title: 'test1',
                subcategories: [
                    {title: 'test1A'},
                    {title: 'test1B'},
                    {title: 'test1C'},
                    {title: 'test1D'}
                ]
            },
            {
                title: 'test2',
                subcategories: [
                    {title: 'test2A'},
                    {title: 'test2B'},
                    {title: 'test2C'},
                    {title: 'test2D'}
                ]
            }
        ];

    beforeEach(inject(function($compile, $rootScope) {
        scope = $rootScope.$new();
        el = angular.element('<div hd-category-list category-title="dummyTitle" stack="dummyStack"></div>');
        scope.dummyTitle = dummyTitle;
        scope.dummyStack = dummyDataSet;
        scope.$apply();
        el = $compile(el)(scope);
        scope.$digest();
    }));

    it("should render the passed data", function() {
        // check chrome title
        expect(el.html()).toContain('Test Title');
        // check main category titles
        expect(el.html()).toContain('test1');
        expect(el.html()).toContain('test2');
        // check sub category titles
        expect(el.html()).toContain('test1A');
        expect(el.html()).toContain('test1B');
        expect(el.html()).toContain('test1C');
        expect(el.html()).toContain('test1D');
        expect(el.html()).toContain('test2A');
        expect(el.html()).toContain('test2B');
        expect(el.html()).toContain('test2C');
        expect(el.html()).toContain('test2D');
    });
});
