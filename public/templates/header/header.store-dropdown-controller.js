// Copyright 2014 Red Beacon, Inc.  All Rights Reserved
//
// This code, and all derivative work, is the exclusive property of
// Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
// authorization.
//
// Author: Ben Clark
//

angular.module('hdProWeb.header')

    .constant('hdProWeb.header.defaultRadius', 25)

    .controller('StoreDropdownController', ['$rootScope', '$scope',
        'hdProWeb.header.defaultRadius', 'CartResource', 'selectedStore', 'stores',
            function($rootScope, $scope, defaultRadius, CartResource, selectedStore, stores) {

                var getStores = function() {
                    $scope.stores = stores.fetch({
                        "zipcode": $scope.currentStore.zipcode,
                        "radius": defaultRadius
                    });

                };

                $scope.init = function() {
                    $scope.currentStore = selectedStore.get();
                    getStores();

                    $scope.showCart = false;
                    $scope.cartModel = CartResource.getCartModel();
                };

                // set new store
                $scope.selectStore = function(store) {
                    selectedStore.set(store);
                    getStores();
                };

                $scope.toggleCart = function() {
                    $scope.showCart = !$scope.showCart;
                };


                // listener
                // ========
                var unbindListener = $rootScope.$on('storeChanged', function(ev, data) {
                    if (data.storeId !== $scope.currentStore.storeId) {
                        $scope.currentStore = data;
                        getStores();
                    }
                });

                // initialize scope
                $scope.init();

                // unbind
                // ======
                $scope.$on('$destroy', unbindListener);

            }
    ]);
