/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Ben Clark
 */

describe("Category controller", function() {

    var el,
        scope,
        state,
        apiService;

    // Inject application
    beforeEach(function() {
        module('hdProWeb');
        module('templates');
    });

    // Setup mock api service
    beforeEach(function() {
        apiService = {
            search: {
                fetch: jasmine.createSpy('searchFetch')
            },
            categories: {
                fetch: function(id) {
                    deferred = q.defer(),
                    promise = deferred.promise;
                    return promise;
                }
            }
        };
        device = {
            isMobile: true
        };
    });

    // Initialize controller and add a mock scope
    beforeEach(inject(function($controller, $q, $rootScope, $state){
        scope = $rootScope.$new();
        scope.device = device;
        q = $q;
        state = $state;
        controller = $controller('CategoryController', {
            $scope: scope,
            $state: state,
            search: apiService.search,
            categories: apiService.categories
        });
        scope.$apply();
    }));

});
