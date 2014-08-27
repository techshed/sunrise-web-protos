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
    .factory('cartParser', ['cartItemParser', function(cartItemParser) {

        return function cartParser (data, model) {

            var cart = {};

            cart.id = data.cart_id;

            // Parse each line item and put them in cart
            cart.items = data.line_items.map(cartItemParser);

            cart.storeId = data.store_id;
            cart.subtotal = data.cart_subtotal;
            cart.lastModifiedDate = data.last_modified_date;
            cart.itemCount = data.item_count;
            cart.inStoreItemCount = data.in_store_item_count;

            // Go through each section and parse items accordingly
            cart.sections = data.sections.map(function(section) {

                // Parse each line item and put them in cart section
                var cartItems = section.line_items.map(cartItemParser);

                // Add parsed section to cart
                return {
                    title: section.title,
                    fulfillment: section.fulfillment_option,
                    cartItems: cartItems
                };
            });

            model.update(cart);

            return model;
        };
    }]);
