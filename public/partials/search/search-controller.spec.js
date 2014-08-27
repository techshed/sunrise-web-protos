/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */

describe('Search Controller', function() {

    // simulate services
    var apiService,
        // controller components
        scope,
        controller;

    // inject application
    beforeEach(module('hdProWeb'));

    // ready mock services
    beforeEach(function(){
        apiService = {
            search: {
                fetch: jasmine.createSpy('searchFetch')
            }
        };
    });

    // initialize controller and add a mock scope
    beforeEach(inject(function($controller, $rootScope, $stateParams){
        scope = $rootScope;
        controller = $controller('SearchController', {
            $scope: scope,
            search: apiService.search
        });
    }));

    it('should make api calls to populate the scope vars', function(){
        expect(apiService.search.fetch).toHaveBeenCalled();
    });

});
