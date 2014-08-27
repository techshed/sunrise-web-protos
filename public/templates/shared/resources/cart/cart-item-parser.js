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
    .factory('cartItemParser', ['CartItemModel', 'productParser',
        function(CartItemModel, productParser) {

            return function cartItemParser(data) {
                // get the default data structure
                var product,
                    result = {};

                model = new CartItemModel();

                result.id = data.line_item_id;
                result.storeId = data.store_id;

                // Should use product store when implemented
                product = productParser(data.product);
                result.product = product;

                result.fulfillment = data.fulfillment;
                result.quantity = data.quantity;

                model.update(result);

                return model;
            };
        }
    ]);
