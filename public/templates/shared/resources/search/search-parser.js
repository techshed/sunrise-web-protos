/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */

angular.module('hdProWeb')
    .factory('searchParser', ['Product', 'productParser',
        function(Product, productParser){
            return function (data, value){
                var rawProducts = data.products;
                data.products = [];
                angular.extend(value, data);
                delete value.total_products;
                delete value.corrected_keyword;
                value.totalProducts = data.total_products;
                value.correctedKeyword = data.corrected_keyword;

                _.each(rawProducts, function(product, key){
                    var model = new Product();
                    productParser(product, model);
                    value.products.push(model);
                });
            };
        }
    ]);
