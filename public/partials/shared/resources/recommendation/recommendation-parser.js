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
    .factory('recommendationParser', ['Product', 'productParser',
        function(Product, productParser){
            return function (data, value){
                _.each(data.products, function(product){
                    var model = new Product();
                    productParser(product, model);

                    // This is a temporary fix for the product recommendation thumbnails' sizes
                    // There will be a permanant fix when API endpoint is fixed
                    // model.images[0].large = 300px (width & height)
                    model.thumbnailUrl = model.images[0].large;
                    value.push(model);
                });
            };
        }
    ]);
