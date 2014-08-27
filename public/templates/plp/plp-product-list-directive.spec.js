/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Ben Clark
 */

describe("plp directive", function() {

    var el,
        scope,
        apiService = {
            CartResource: {
                getCartModel: jasmine.createSpy('cartgetCartModel'),
                getQuantity: jasmine.createSpy('cartgetCartModel')
            }
        };

    beforeEach(function() {
        module('hdProWeb');
        module('templates');
        module(function($provide) {
            $provide.value('CartResource', apiService.CartResource);
        });
    });

    var dummyTotal = "9000",
        dummyDataSet = [
            {
                id: "11111111",
                thumbnailUrl: "http://placehold.it/65/1",
                brandName: "sample_brand1",
                title: "sample_title1",
                price: "9.99",
                inventoryCount: "9000"
            },
            {
                id: "22222222",
                thumbnailUrl: "http://placehold.it/65/2",
                brandName: "sample_brand2",
                title: "sample_title2",
                price: "19.99",
                inventoryCount: "9001"
            },
            {
                id: "33333333",
                thumbnailUrl: "http://placehold.it/65/3",
                brandName: "sample_brand3",
                title: "sample_title3",
                price: "29.99",
                inventoryCount: "9002"
            }
        ];

    beforeEach(inject(function($compile, $rootScope) {
        scope = $rootScope.$new();
        el = angular.element('<div hd-product-list products="testProductList" title="Test Title" total-products="testTotal"></div>');
        scope.testProductList = dummyDataSet;
        scope.testTotal = dummyTotal;
        scope.$apply();
        el = $compile(el)(scope);
        scope.$digest();
    }));

    it("should render the passed data", function() {
        expect(el.html()).toContain('Test Title');
        // ids
        expect(el.html()).toContain('11111111');
        expect(el.html()).toContain('22222222');
        expect(el.html()).toContain('33333333');
        // thumbnails
        expect(el.html()).toContain('http://placehold.it/65/1');
        expect(el.html()).toContain('http://placehold.it/65/2');
        expect(el.html()).toContain('http://placehold.it/65/3');
        // brands
        expect(el.html()).toContain('sample_brand1');
        expect(el.html()).toContain('sample_brand2');
        expect(el.html()).toContain('sample_brand3');
        // titles
        expect(el.html()).toContain('sample_title1');
        expect(el.html()).toContain('sample_title2');
        expect(el.html()).toContain('sample_title3');
        // prices
        expect(el.html()).toContain('9.99');
        expect(el.html()).toContain('19.99');
        expect(el.html()).toContain('29.99');
        // counts
        expect(el.html()).toContain('9000');
        expect(el.html()).toContain('9001');
        expect(el.html()).toContain('9002');
    });

});
