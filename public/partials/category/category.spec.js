/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Ben Clark
 */

describe("category module", function() {

    beforeEach(function(){
        angular.mock.module('hdProWeb');
        angular.mock.module('templates');
    });

    describe("Partials Path", function() {
        it("should have correct partials value", function() {
            var $injector = angular.injector(['hdProWeb']);
            var partials = $injector.get('hdProWeb.category.Partials');
            expect(partials).toEqual('/static/core/app/category/partials');
        });
    });
});
