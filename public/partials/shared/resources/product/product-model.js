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
        title: '',
        description: '',
        brandName: '',
        price: null,
        inventoryCount: 0,
        images: [],
        originalPrice: null,
        discount: null,
        thumbnailUrl: 'http://placehold.it/65',
        fulfillmentOptions: [],
        defaultFulfillment: '',
        availability: '',
        pdfDocuments: [],
        averageRating: 0,
        totalReviews: 0,
        empty: true
    };

    var Product = function(item) {
        item = item || defaults;

        // Set all data on the model
        this.setData(item);
    };

    Product.prototype.setData = function(data) {
        for (var key in data) {
            if (typeof data[key] !== 'function' && data[key] !== undefined) {
                this[key] = data[key];
            }
        }
    };

    Product.prototype.update = function(data) {
        return this.setData(data, true);
    };

    Product.prototype.isFulfillmentAvailable = function(fulfillment) {
        return (this.fulfillmentOptions &&
                this.fulfillmentOptions.hasOwnProperty(fulfillment));
    };
    // End of model definition


    // If angular is available, register the model as a factory.
    // Otherwise, place it on the global scope.
    if ('angular' in global) {
        angular.module('hdProWeb')
            .factory('Product', [function() {
                return Product;
            }]);
    } else {
        global.Product = Product;
    }
})(this);
