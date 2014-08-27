/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Ben Clark
 */

describe("Footer Module", function() {

    var el,
        scope;

    beforeEach(function(){
        angular.mock.module('hdProWeb');
        angular.mock.module('templates');
    });

    describe("Partials Path", function() {
        it("should have correct partials value", function() {
            var $injector = angular.injector(['hdProWeb']);
            var partials = $injector.get('hdProWeb.footer.Partials');
            expect(partials).toEqual('/static/core/app/footer/partials');
        });
    });
});
