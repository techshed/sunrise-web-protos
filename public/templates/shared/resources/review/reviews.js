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
    .factory('reviews', ['$resource', 'ApiRoot', 'reviewParser', function($resource, ApiRoot, reviewParser) {
        var api = $resource(ApiRoot + '/products/reviews/', {
            'product_id': '',
            'page': 0,
            'format': 'json',
            'page_size': 5
        });

        return {
            fetch: function(params, callback) {
                var result = {};

                api.get(params).$promise.then(function(data) {
                    angular.extend(result, reviewParser(data));
                    callback && callback(result);
                });

                return result;
            }
        };
    }]);
