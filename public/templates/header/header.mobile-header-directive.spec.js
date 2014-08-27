/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Ben Clark
 */

describe("Rendering the mobile header directive", function() {

    var el,
        scope;

    beforeEach(function(){
        module('hdProWeb');
        module('templates');
    });

    beforeEach(inject(function($compile, $rootScope) {
        scope = $rootScope;
        el = angular.element('<div hd-mobile-header></div>');
        el = $compile(el)(scope);
        scope.$digest();
    }));

    // it("should render the search field's directive tag", function() {
    //     expect(el.html()).toContain("hd-search-field");
    // });

    // it("should render both of the button icons", function() {
    //     expect(el.html()).toContain("MobileNav-cartIcon");
    //     expect(el.html()).toContain("MobileNav-menuIcon");
    // });

    // it("should render both slide out panes", function() {
    //     expect(el.html()).toContain("MenuPane");
    //     expect(el.html()).toContain("CartPane");
    // });

});
