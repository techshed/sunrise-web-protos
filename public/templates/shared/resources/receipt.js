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

    .factory('receipt', ['$resource', 'ApiRoot', function($resource, ApiRoot){

        var api = $resource(ApiRoot + '/orders/in-store/:id/receipt/', {
            'format': 'json'
        });

        return {

            fetch: function(order){

                if (order.type === 'in-store'){
                    return api.get({
                        'id': order.id,
                        'store_id': order.storeId,
                        'sales_date': order.date.slice(0,10),
                        'register_number': order.registerNumber
                    }).$promise;
                } else {
                    // TODO(caner) create receipt for online purchase and return data
                }
            }
        };
    }]);
