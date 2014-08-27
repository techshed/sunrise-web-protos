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
    .factory('orderParser', function() {
        return function(data, parsedData) {
            parsedData.storeName = data.store_name;
            parsedData.storeId = data.store_id;
            parsedData.registerNumber = data.register_number;
            parsedData.orderNumbers = data.order_numbers;
            parsedData.jobName = data.job_name;
            parsedData.date = data.date;
            parsedData.total = data.total;
            parsedData.type = data.type;
            parsedData.id = data.id;
        };
    });
