/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Ben Clark
 */

describe("Header Module", function() {

    var el,
        scope,
        apiService;

    apiService = {
        stores: {
            fetch: jasmine.createSpy('storesFetch')
        }
    };

    beforeEach(function(){
        angular.mock.module('hdProWeb');
        angular.mock.module('templates');
        module(function($provide) {
            $provide.value('stores', apiService.stores);
        });
    });

    describe("Partials Path", function() {
        it("should have correct Partials value", function() {
            var $injector = angular.injector(['hdProWeb']);
            var partials = $injector.get('hdProWeb.header.Partials');
            expect(partials).toEqual('/static/core/app/header/partials');
        });
    });
});
