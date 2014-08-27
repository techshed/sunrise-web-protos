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
        "id": 0,
        "store_id": null,
        "product": null,
        "fulfillment": "ShipToHome",
        "quantity": 1
    };

    var CartItemModel = function(data) {
        data = data || defaults;

        this.setData(data);
    };

    CartItemModel.prototype.setData = function(data) {
        for (var key in data) {
            if (typeof data[key] !== 'function' && data[key] !== undefined) {
                this[key] = data[key];
            }
        }
    };

    CartItemModel.prototype.update = function(data) {
        return this.setData(data, true);
    };
    // End of model definition


    // If angular is available, register the model as a factory.
    // Otherwise, place it on the global scope.
    if ('angular' in global) {
        angular.module('hdProWeb')
            .factory('CartItemModel', [function() {
                return CartItemModel;
            }]);
    } else {
        global.CartItemModel = CartItemModel;
    }
})(this);
