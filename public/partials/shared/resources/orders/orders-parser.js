/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Volkan Gul
 */

angular.module('hdProWeb')
    .factory('ordersParser',['orderParser', function(orderParser) {
        return function(data, parsedData) {
            var rawOrders = data.orders;
            parsedData.orders = [];

            rawOrders.forEach(function(rawOrder, index, array) {
                var parsedOrder = {};
                orderParser(rawOrder, parsedOrder);
                parsedData.orders.push(parsedOrder);
            });
        };
    }]);
