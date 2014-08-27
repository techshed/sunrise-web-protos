/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Caner Balci
 */

describe("Purchase History Controller", function() {

    var apiService,
        controller,
        // deferred is availabe so we can resolve it anywhere in the script
        deferred,
        q,
        scope;

    // ready mock services
    beforeEach(function(){

        apiService = {
            orders: {
                fetch: function(){
                    deferred = q.defer();
                    // return an object that looks like a $resource
                    return {$promise: deferred.promise};
                }
            },
            orderDetails: {
                get: function(){
                    deferred = q.defer();
                    return deferred.promise;
                }
            },
            product: {
                get: function(id){
                    deferred = q.defer();
                    return {$promise: deferred.promise};
                }
            },
            receipt: {
                fetch: function(order){
                    deferred = q.defer();
                    return deferred.promise;
                }
            }
        };
    });

    // load module
    beforeEach(module('hdProWeb'));

    // initialize controller and add a mock scope
    beforeEach(inject(function($controller, $rootScope, $q){

        q = $q;
        scope = $rootScope.$new();
        controller = $controller('PurchaseHistoryController', {
            $scope: scope,
            orders: apiService.orders,
            orderDetails: apiService.orderDetails,
            product: apiService.product,
            receipt: apiService.receipt
        });
    }));

    it("should make an api call to fetch past orders", function(){

        spyOn(apiService.orders, 'fetch').andCallThrough();
        scope.init();
        expect(apiService.orders.fetch).toHaveBeenCalled();
    });
});
