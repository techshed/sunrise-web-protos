/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Ben Clark
 */

angular.module('hdProWeb')

    .factory('storeParser',
        function() {
            return function(data, result) {

                var stores = data.stores;

                _.each(stores, function(value) {
                    var store = {};

                    store.name = value.name;
                    store.storeId = value.store_id;
                    store.distance = value.distance;
                    store.phone = value.phone;
                    store.lat = value.coordinates.lat;
                    store.lng = value.coordinates.lng;
                    store.city = value.address.city;
                    store.zipcode = value.address.postal_code;
                    store.streetAddress = value.address.street;
                    store.cityAddress = value.address.city + ", " +
                                        value.address.state +
                                        value.address.postal_code;

                    store.hoursWeek = {
                        "open" : value.hours[0].open,
                        "close" : value.hours[0].close
                    };
                    store.hoursSunday = {
                        "open" : value.hours[1].open,
                        "close" : value.hours[1].close
                    };

                    store.services = [];
                    _.each(value.services, function(value, key, list) {
                        store.services.push(key);
                    });

                    store.contacts = {};
                    _.each(value.store_contacts, function(value) {
                        store.contacts[value.role] = value.name;
                    });

                    result.push(store);
                });
            };
        }
    );
