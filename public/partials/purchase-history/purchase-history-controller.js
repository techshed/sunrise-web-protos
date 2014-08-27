/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Caner Balci
 */
angular.module('hdProWeb.purchaseHistory')

    .controller('PurchaseHistoryController', ['$dialogs',
                                            '$scope',
                                            '$rootScope',
                                            '$window',
                                            '$state',
                                            'orders',
                                            'orderDetails',
                                            'product',
                                            'receipt',
                                            'device',
                                            'deviceDetection.DeviceScreenSizeChanged',
                                            'hdProWeb.OrderTypeInStore',
        function($dialogs,
                $scope,
                $rootScope,
                $window,
                $state,
                orders,
                orderDetails,
                product,
                receipt,
                device,
                DeviceScreenSizeChanged,
                OrderTypeInStore) {

            $scope.orderList = [];
            $scope.selectedOrderIndex = 0;
            $scope.selectedOrderDetails = {items:[]};
            $scope.selectedOrderProducts = [];
            $scope.showLoading = true;
            $scope.showLoadingError = false;

            $scope.device = device;
            var deviceListener = $rootScope.$on(DeviceScreenSizeChanged, function() {
                $scope.$apply();
            });

            $scope.init = function init() {
                // fetch previous orders
                orders.fetch(
                    function(data) {
                        $scope.showLoading = false;
                        $scope.orderList = data.orders;
                        if ($scope.orderList.length > 0) {
                            $scope.selectOrder(0);
                        }
                    },
                    function(error) {
                        $scope.showLoading = false;
                        $scope.showLoadingError = true;
                    }
                );
            };

            $scope.init();

            $scope.selectOrder = function($index) {

                // reveal details panel on mobile
                if ($scope.device.isMobile) {
                    $state.go('purchaseDetails');
                    $('.PurchaseHistory-body').addClass('PurchaseHistory-body--detailsShown');

                    // this is for preventing slip on details panel
                    // it gets scrolled out of view otherwise
                    // timeout is to give some time to sliding animation
                    setTimeout(function() {
                        $window.scrollTo(0, 0);
                    }, 200);
                }

                var order = $scope.orderList[$index];
                $scope.selectedOrderProducts = [];
                $scope.selectedOrderIndex = $index;
                orderDetails.fetch(order).then(function(data) {
                    $scope.selectedOrderDetails = data;
                }).then(function() {
                    var isInStore = (order.type === OrderTypeInStore);
                    $scope.selectedOrderProducts = [];

                    if (isInStore){
                        $scope.selectedOrderProducts = _($scope.selectedOrderDetails.items).map(function(value, key) {
                            var result = product.fetch({ id: value.id, storesku: isInStore });
                            result.quantity = value.quantity;
                            return result;
                        });

                    } else {
                        var itemIds =[],
                            indexedItems = {};
                        // indexing items for faster access after products are fetched
                        _.each($scope.selectedOrderDetails.items, function(item){
                            itemIds.push(item.id);
                            indexedItems[item.id] = item;
                        });

                        $scope.selectedOrderProducts = _.map(product.fetchAll({ ids: itemIds }), function(product) {
                            var itemDetails = indexedItems[product.id];
                            if (itemDetails && itemDetails.quantity){
                                product.quantity = itemDetails.quantity;
                            } else {
                                product.quantity = 1;
                            }
                            return product;
                        });
                    }
                });
            };

            $scope.printReceipt = function() {
                var order = $scope.orderList[$scope.selectedOrderIndex];

                // TODO(caner) make sure popup blocker is off
                var popup = window.open('', '', 'height=600,width=413');
                popup.document.write("Fetching your receipt, please wait.");
                receipt.fetch(order).then(function(data) {
                    if (data.success) {
                        popup.document.body.innerHTML = '';
                        popup.document.write("<button onClick='window.print()' style='float:right; margin:10px;'>Print</button>");
                        popup.document.write(data.receipt);
                    } else {
                        popup.close();
                        $dialogs.error('Error', 'Unable to fetch receipt.');
                    }
                });
            };

            // listeners
            // =========
            var unbindBackListener = $rootScope.$on('MobileHeader.BackButtonPressed',
                function(ev, data) {
                    $state.go('purchaseHistory');
                    // transition page back to store list
                    $('.PurchaseHistory-body').removeClass('PurchaseHistory-body--detailsShown');
                }
            );

            // unbind
            // ======
            $scope.$on('$destroy', function() {
                unbindBackListener();
                deviceListener();
            });
        }
    ]);
