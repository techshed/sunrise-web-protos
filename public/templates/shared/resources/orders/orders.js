/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Caner Balci
 */

angular.module('hdProWeb')

    // order types as constants
    .constant('hdProWeb.OrderTypeInStore', 'in-store')
    .constant('hdProWeb.OrderTypeOnline', 'online')

    .factory('orders', ['$resource', 'ApiRoot', 'ordersParser', function($resource, ApiRoot, ordersParser) {
        var api = $resource(ApiRoot + '/orders/', {
            'format': 'json'
        });

        return {
            fetch: function(successCallback, errorCallback) {
                var parsedData = {};
                api.get({}, function(data) {
                    if (data.success){
                        ordersParser(data, parsedData);
                        successCallback(parsedData);
                    } else {
                        errorCallback(error);
                    }
                }, function(error) {
                    errorCallback(error);
                });
            }
        };
    }])

    .factory('orderDetails', ['$resource', 'ApiRoot', function($resource, ApiRoot) {

        var api = $resource(ApiRoot + '/orders/:type/:id/', {
            'format': 'json'
        });

        return {
            fetch: function(parsedOrder) {
                // returning the promise because we need to be notified
                // when the data is fetched inside purchaseHistoryController
                return api.get({
                    'type': parsedOrder.type,
                    'id': parsedOrder.id,
                    'store_id': parsedOrder.storeId,
                    'sales_date': parsedOrder.date.slice(0,10),
                    'register_number': parsedOrder.registerNumber
                }).$promise;
            }
        };
    }]);
