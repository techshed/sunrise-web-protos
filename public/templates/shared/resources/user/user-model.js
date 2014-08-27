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
        email: '',
        firstName: '',
        lastName: '',
        fullName: '',
        zipCode: 0,
        isDotcom: false,
        isProXtra: false,
        isContractor: false,
        isTradesman: false
    };

    var User = function(item) {
        item = item || defaults;

        // Set all data on the model
        this.setData(item);
    };

    User.prototype.setData = function(data) {
        for (var key in data) {
            if (typeof data[key] !== 'function' && data[key] !== undefined) {
                this[key] = data[key];
            }
        }
    };

    User.prototype.update = function(data) {
        return this.setData(data, true);
    };
    // End of model definition


    // If angular is available, register the model as a factory.
    // Otherwise, place it on the global scope.
    if ('angular' in global) {
        angular.module('hdProWeb')
            .factory('UserModel', [function() {
                return User;
            }]);
    } else {
        global.User = User;
    }
})(this);

