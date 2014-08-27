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

    .controller('DesktopHeaderController', ['$rootScope',
                                      '$scope',
                                      'hdProWeb.header.defaultRadius',
                                      'geoLocation',
                                      'selectedStore',
                                      'stores',

        function($rootScope, $scope, defaultRadius, geoLocation, selectedStore, stores) {

            $scope.currentStore = null;
            $scope.stores = null;

            $scope.init = function() {
                // Test call of fetch location
                geoLocation.fetchLocation();

                // Get current store
                $scope.currentStore = selectedStore.get();
                $scope.stores = stores.fetch({
                    "zipcode": $scope.currentStore.zipcode,
                    "radius": defaultRadius
                });
            };

            $scope.selectStore = function(store) {
                selectedStore.set(store);
            };

            // Initialize scope
            $scope.init();

            var unbindListener = $rootScope.$on('storeChanged', function(ev, data) {
                if (data.storeId !== $scope.currentStore.storeId) {
                    $scope.currentStore = data;
                }
            });
            $scope.$on('$destroy', unbindListener);
        }
    ]);
