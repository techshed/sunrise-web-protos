/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Ben Clark
 */

describe("Product List Area Module", function() {

    // controller components
    var scope,
        controller;

    beforeEach(module('hdProWeb'));

    // initialize controller and add a mock scope
    beforeEach(inject(function($controller, $rootScope){
        scope = $rootScope.$new();
        controller = $controller('PlpController', {
            $scope: scope
        });
    }));

    it("should have correct Partials value", function() {
        var $injector = angular.injector(['hdProWeb.plp']),
            partials = $injector.get('hdProWeb.plp.Partials');
        expect(partials).toEqual('/static/core/app/plp/partials');
    });

});
