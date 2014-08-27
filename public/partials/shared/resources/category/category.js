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
    .factory('categories', ['$q', '$resource', 'ApiRoot', 'Category', 'categoryParser',
        function($q, $resource, ApiRoot, Category, categoryParser) {

            var api = $resource(ApiRoot + '/categories/:id/');

            return {
                fetch: function(params) {

                    var value = new Category(),
                        deferred = $q.defer(),
                        promise = deferred.promise;

                    value.subcategories = [];

                    api.get(params).$promise.then(function(data) {
                        categoryParser(data, value);
                        deferred.resolve(value);
                    });

                    return promise;
                }
            };
        }
    ]);
