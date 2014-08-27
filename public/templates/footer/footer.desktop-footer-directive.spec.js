/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Ben Clark, Deniz Arsan
 */

describe("Desktop footer directive", function() {

    var el,
        scope;

    beforeEach(function(){
        module('hdProWeb');
        module('templates');
    });

    beforeEach(inject(function($compile, $rootScope) {
        scope = $rootScope;
        el = angular.element('<div hd-desktop-footer></div>');
        el = $compile(el)(scope);
        scope.$digest();
    }));

    it("should render the footer template", function() {
        expect(el.html()).toContain('class="Footer');
    });

});
