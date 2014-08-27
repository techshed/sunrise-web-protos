/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Ben Clark
 */

describe("Storefront controller", function() {

    // simulate services
    var apiService,
        // controller components
        scope,
        controller,
        q,
        deferred;

    // inject application
    beforeEach(module('hdProWeb'));

    // ready mock services
    beforeEach(function(){
        apiService = {
            search: {
                fetch: jasmine.createSpy('searchFetch')
            },
            occupations: {
                fetch: jasmine.createSpy('occupationFetch')
            },
            categories: {
                fetch: function(id) {
                    deferred = q.defer();
                    return deferred.promise;
                }
            }
        };
    });

    // initialize controller and add a mock scope
    beforeEach(inject(function($controller, $q, $rootScope, $stateParams){
        scope = $rootScope.$new();
        q = $q;
        controller = $controller('StoreFrontController', {
            $scope: scope,
            search: apiService.search,
            occupations: apiService.occupations,
            categories: apiService.categories
        });
    }));

    it("should have a correct partials value", function() {
        var $injector = angular.injector(['hdProWeb.storeFront']);
        var partials = $injector.get('hdProWeb.storeFront.Partials');
        expect(partials).toEqual('/static/core/app/store-front/partials');
    });

    it("should make api calls to populate the scope vars", function(){
        scope.init();
        expect(apiService.search.fetch).toHaveBeenCalled();
        expect(apiService.occupations.fetch).toHaveBeenCalled();
    });
});
