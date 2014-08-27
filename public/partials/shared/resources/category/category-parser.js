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
    .factory('categoryParser', function() {
        return function(data, model) {
            var result = {};

            result.id = (data.id === null) ? "" : data.id;
            result.title = data.title;
            result.subcategories = data.subcategories;

            model.update(result);

            return model;
        };
    });
