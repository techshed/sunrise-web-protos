/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Ben Clark
 */

angular.module('hdProWeb.location', [])

    .factory('selectedStore', ['$rootScope',
        function($rootScope){

            // emit a change of store event
            var emitStoreChange = function() {
                $rootScope.$emit('storeChanged', location);
            };

            // XXX: mock default location
            var location = {
                "name": "San Carlos",
                "storeId": "0628",
                "city": "San Carlos",
                "zipcode": "94070"
            };

            return {
                get: function() {
                    return location;
                },
                getZipcode: function() {
                    return location.zipcode;
                },
                set: function(newLocation) {
                    location = newLocation;
                    emitStoreChange();
                    return location;
                }
            };
        }
    ])

    .factory('geoLocation', [function() {
        var lng, lat;

        // error states
        var UserPermissionError = 1,
            NetworkError = 2,
            TimeoutError = 3;

        // the callback function to grab the latitude and longitude
        // from the location query
        var userPosition = function(position) {
            lng = position.coords.longitude;
            lat = position.coords.latitude;
            console.log("%s, %s", lat, lng);
        };

        // handles the error states returned from the geo location lookup
        // 1 - user refused location request
        // 2 - a network error is present blocking the request
        // 3 - the request timed out.
        var handleErrors = function(err) {
            if (err === UserPermissionError) {
                console.log("user said no");
            } else if (err === NetworkError) {
                console.log("network is down");
            } else if (err === TimeoutError) {
                console.log("request timed out");
            }
        };

        return {
            // call to grab the user's location
            fetchLocation: function() {
                if (Modernizr.geolocation) {
                    navigator.geolocation.getCurrentPosition(userPosition, handleErrors, {enableHighAccuracy: false});
                } else if (geoPosition.init()) {
                     geoPosition.getCurrentPosition(userPosition, handleErrors, {enableHighAccuracy: false});
                } else {
                    // we can't attain the position of the user by normal means.
                }
            },
            // should return the found data
            // XXX (todo) calibrate to allow watch/broadcast/emit
            foundLocation: function() {
                return {
                    "long": lng,
                    "lat": lat
                };
            }
        };
    }]);
