/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Ben Clark
 */

describe("Account Menu directive", function () {

    var el,
        scope;

    beforeEach(function(){
        module('hdProWeb');
        module('templates');
    });

    beforeEach(inject(function($compile, $rootScope) {
        scope = $rootScope;
        el = angular.element("<div hd-account-menu></div>");
        el = $compile(el)(scope);
        scope.$digest();
    }));

    it("should render the hidden slide menu", function() {
        expect(el.html()).toContain("Account profile");
        expect(el.html()).toContain("Logout");
    });

    it("should toggle the scope var when the functions are called", function() {
        el.scope().openTray();
        el.scope().$digest();
        expect(el.scope().open).toBe(true);
        el.scope().closeTray();
        el.scope().$digest();
        expect(el.scope().open).toBe(false);
    });

});
