/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Ben Clark
 */

(function(global, undef) {

    "use strict";

    var defaults = {
        name: '',
        storeId: '',
        distance: 0,
        phone:'',
        lat: '',
        lng: '',
        city: '',
        zipcode: '',
        streetAddress: '',
        cityAddress: '',
        hoursWeek: {},
        hoursSunday: {},
        services: [],
        contacts: {}
    };

    var Store = function(store) {
        store = store || defaults;

        // Set all data on the model
        this.setData(store);
    };

    Store.prototype.setData = function(data) {
        for (var key in data) {
            if (typeof data[key] !== 'function' && data[key] !== undefined) {
                this[key] = data[key];
            }
        }
    };
    // End of model definition


    // If angular is available, register the model as a factory.
    // Otherwise, place it on the global scope.
    if ('angular' in global) {
        angular.module('hdProWeb')
            .factory('Store', function() {
                return Store;
            });
    } else {
        global.Store = Store;
    }
})(this);
