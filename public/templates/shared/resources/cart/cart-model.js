/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */

(function(global, undef) {

    "use strict";

    var defaults = {
        "items": [],
        "storeId": null,
        "success": true,
        "cartSubtotal": "$0.00",
        "lastModifiedDate": null,
        "itemCount": 0,
        "inStoreItemCount": 0,
        "sections": []
    };

    var CartModel = function(data) {
        data = data || defaults;

        // Set all data on the model
        this.setData(data);
    };

    CartModel.prototype.setData = function(data) {
        for (var key in data) {
            if (typeof data[key] !== 'function' && data[key] !== undefined) {
                this[key] = data[key];
            }
        }
    };

    CartModel.prototype.update = function(data) {
        return this.setData(data, true);
    };
    // End of model definition


    // If angular is available, register the model as a factory.
    // Otherwise, place it on the global scope.
    if ('angular' in global) {
        angular.module('hdProWeb')
            .factory('CartModel', function() {
                return CartModel;
            });
    } else {
        global.CartModel = CartModel;
    }
})(this);
