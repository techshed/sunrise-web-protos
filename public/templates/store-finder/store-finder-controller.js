/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Ben Clark
 */

angular.module('hdProWeb.storeFinder')

    .constant('radiusConstants', [5, 10, 25, 50, 100])

    .controller('StoreFinderController', ['$rootScope', '$scope', '$state',
        'radiusConstants', 'selectedStore', 'stores',
            function($rootScope, $scope, $state, radiusConstants, selectedStore, stores) {

                $scope.init = function() {
                    // XXX: populate list with default values on start
                    $scope.getStores();
                };

                // XXX: faking geo location with default data
                $scope.zipcode = selectedStore.getZipcode();
                $scope.radius = 25;
                $scope.radiusArray = radiusConstants;

                $scope.visibleStore = {};
                $scope.userStore = {};
                $scope.showDetails = false;
                $scope.stores = [];
                $scope.markerString = "";

                // builds the string list of zipcodes for the static map
                var setZipcodes = function() {
                    $scope.markerString = "S%7C";
                    _.each($scope.stores, function(data) {
                        $scope.markerString += "S%7C" + data.zipcode;
                    });
                };

                $scope.getStores = function() {
                    $scope.showDetails = false;
                    $scope.visibleStore = {};
                    $scope.stores = stores.fetch({
                        zipcode: $scope.zipcode,
                        radius: $scope.radius
                    });
                };

                $scope.showStoreDetails = function(store) {
                    $scope.visibleStore  = store;
                    $scope.showDetails = true;

                    // temp switch for slide in on responsive
                    // XXX (todo): replace with modernizr
                    if ($('.StoreFinder-map').is(':hidden') ) {
                        $state.go('storeDetails');
                        $('.StoreFinder-body').addClass('StoreFinder-body--detailsShown');
                    }
                };

                $scope.setUserStore = function(store) {
                    $scope.userStore = store;
                    selectedStore.set(store);
                };

                // watchers
                // ========
                $scope.$watch('radius', function(oldVal, newVal) {
                    // ignores the first initialization state of the controller
                    if (newVal !== oldVal) {
                        $scope.getStores;
                    }
                });
                $scope.$watch('stores',  setZipcodes, true);


                // listeners
                // =========
                var unbindBackListener = $rootScope.$on('MobileHeader.BackButtonPressed',
                    function(ev, data) {
                        // trigger the original state
                        $state.go('storeFinder');
                        // transition page back to store list
                        $('.StoreFinder-body').removeClass('StoreFinder-body--detailsShown');
                    }
                );

                // unbind
                // ======
                $scope.$on('$destroy', function() {
                    unbindBackListener();
                });

                // initialize scope
                $scope.init();
            }
    ]);
