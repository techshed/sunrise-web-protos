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

    'use strict';

    var defaults = {
        title: '',
        id: '',
        subcategories: [],
        thumbnail: null
    };

    var Category = function(item) {
        item = item || defaults;
        this.setData(item);
    };

    Category.prototype.setData = function(data) {
        for (var key in data) {
            if (typeof data[key] !== 'function' && data[key] !== undefined) {
                this[key] = data[key];
            }
        }
    };

    Category.prototype.update = function(data) {
        return this.setData(data);
    };

    Category.prototype.containsChildCategory = function(id) {
        var length = this.subcategories.length;

        for (var i = 0; i < length; i++) {
            if (this.subcategories[i].id === id) {
                return true;
            }
        }

        return false;
    };

    Category.prototype.isLeafCategory = function() {
        return this.subcategories.length === 0;
    };


    // If angular is available, register the model as a factory.
    // Otherwise, place it on the global scope.
    if ('angular' in global) {
        angular.module('hdProWeb')
            .factory('Category', [function() {
                return Category;
            }]);
    } else {
        global.Category = Category;
    }
})(this);
