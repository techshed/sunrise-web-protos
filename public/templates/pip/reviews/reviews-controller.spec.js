/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */

describe('Reviews Controller', function() {

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
            reviews: {
                fetch: jasmine.createSpy('reviewsFetch')
            }
        };
    });

    // initialize controller and add a mock scope
    beforeEach(inject(function($controller, $rootScope, $stateParams){
        scope = $rootScope.$new();
        controller = $controller('ReviewController', {
            $scope: scope,
            reviews: apiService.reviews
        });

        // Update review page value
        scope.reviewPage = 1;
        scope.$digest();
    }));

    it('should make api calls to populate the scope vars', function(){
        expect(apiService.reviews.fetch).toHaveBeenCalled();
        expect(apiService.reviews.fetch.callCount).toBe(1);
    });

    it('should make new api calls when reviewPage value is changed', function(){
        scope.reviewPage = 2;
        scope.$digest();
        expect(apiService.reviews.fetch.callCount).toBe(2);
    });

});
