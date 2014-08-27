/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Ben Clark
 */

describe("Desktop Header directive", function() {

    var el,
        scope,
        q,
        deferred;

    apiService = {
        stores: {
            fetch: jasmine.createSpy('storesFetch')
        },
        CartResource: {
            getCartModel: jasmine.createSpy('cartgetCartModel')
        },
        categories: {
            fetch: function(id) {
                deferred = q.defer();
                return deferred.promise;
            }
        }
    };

    beforeEach(function(){
        module('hdProWeb');
        module('templates');
        module(function($provide) {
            $provide.value('stores', apiService.stores);
            $provide.value('CartResource', apiService.CartResource);
            $provide.value('categories', apiService.categories);
        });
    });

    beforeEach(inject(function($compile, $q, $rootScope) {
        scope = $rootScope;
        q = $q;
        el = angular.element('<div hd-desktop-header></div>');
        el = $compile(el)(scope);
        scope.$digest();
    }));

    it("should render the account menu's directive tag", function() {
        expect(el.html()).toContain("hd-account-menu");
    });

    it("should render the search field's directive tag", function() {
        expect(el.html()).toContain("hd-search-field");
    });

    it("should render the Home Depot logo", function() {
        expect(el.html()).toContain('<div class="Header-logo-img"></div>');
    });

    it("should render the three dropdown menus", function() {
        expect($(el).find('.dropdown').length).toBe(3);
    });

});
