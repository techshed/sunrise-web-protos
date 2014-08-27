/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */

describe('Pip Controller', function() {

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
            product: {
                fetch: jasmine.createSpy('productFetch')
            },
            recommendation: {
                fetch: jasmine.createSpy('recommendationFetch')
            }
        };
    });

    // initialize controller and add a mock scope
    beforeEach(inject(function($controller, $rootScope, $stateParams){
        scope = $rootScope.$new();
        controller = $controller('PipController', {
            $scope: scope,
            product: apiService.product,
            recommendation: apiService.recommendation
        });
    }));

    it('should make api calls to populate the scope vars', function(){
        expect(apiService.product.fetch).toHaveBeenCalled();
        expect(apiService.recommendation.fetch).toHaveBeenCalled();
    });

});
