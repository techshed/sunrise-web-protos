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
    .factory('CartResourceApi', ['$resource', 'ApiRoot', function($resource, ApiRoot) {

        // Default get request for this url will
        // get current cart for the active user.
        var api = $resource(ApiRoot + '/cart/', {
            show_store_details: null
        }, {

            // Add an item to the cart.
            addNewItem: {
                params: {
                    'item_id': null,  // Product id.
                    'store_id': null, // Store number.
                    'method': null,   // Fulfillment method. ['BOPIS', 'ShipToStore', 'ShipToHome']
                    'quantity': 1     // (optional) Defaults to 1.
                },
                method: 'POST'
            },

            // Update multiple items in the cart.
            updateItems: {
                // Request data format:
                //
                // {
                //     "store_id": "1220",
                //     "line_items": [
                //         {
                //             "line_item_id": 379871535,
                //             "method": "BOPIS",
                //             "quantity": 1
                //         },
                //         {
                //             "line_item_id": 379871534,
                //             "method": "BOPIS",
                //             "quantity": 1
                //         }
                //     ]
                // }
                //
                // store_id, line_item_id, method and quantity are
                // required. Valid fulfillment method options are 'BOPIS',
                // 'ShipToStore', 'ShipToHome'.
                params: {
                    'store_id': null,
                    'line_items': []
                },
                method: 'PUT'
            },

            // Get nearby stores to fulfill all items in cart and PIP page product via BOPIS
            getNearbyStores: {
                params: {
                    'store_id': null,   // the store id
                    'product_id': null  // product id to be checked with Cart products as well.
                },
                method: 'GET',
                url: ApiRoot + '/cart/bopis_store/'
            },

            // Receives store_id, product_id, and quantity. Adds product_id to cart.
            addToBopisStore: {
                params: {
                    'product_id': null,
                    'store_id': null,
                    'quantity': 1
                },
                method: 'POST',
                url: ApiRoot + '/cart/bopis_store/'
            },

            // Get per-store inventory for each item in the cart
            getInventory: {
                params: {
                    'store_id': null,   // the store id
                    'latitude': null,   // Define a point to find nearby stores. Combine with longitude.
                    'longitude': null,  // Define a point to find neaby stores. Combine with latitude.
                    'zipcode': null,    // US zipcode.
                    'address': null,    // A string of address.
                    'city': null,       // US city. Combine with state.
                    'state': null       // US state. Combine with city.
                },
                method: 'GET',
                url: ApiRoot + '/cart/inventory/'
            },

            // Apply a promo code to cart.
            addPromoCode: {
                params: {
                    'promo': null
                },
                method: 'POST',
                url: ApiRoot + '/cart/promo/'
            },

            // Remove promo code from cart.
            removePromoCode: {
                params: {
                    'promo_code': null
                },
                method: 'DELETE',
                url: ApiRoot + '/cart/promo/:promo_code/'
            }
        });

        return api;
    }]);
