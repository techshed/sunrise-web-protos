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
    .factory('listParser', ['Product', 'productParser',
        function(Product, productParser) {
            return function(data, value) {
                var rawProducts = data.items;
                value.lastModifiedDate = data.last_modified_date;
                value.itemsCount = data.items_count;
                value.unitsCount = data.units_count;
                value.subtotal = data.subtotal;
                value.id = data.id;
                value.success = data.success;
                value.name = data.name;
                value.items = [];

                _.each(rawProducts, function(product, index, array) {
                    var model = new Product();
                    productParser(product, model);
                    value.items.push(model);
                });
            };
        }
    ]);
