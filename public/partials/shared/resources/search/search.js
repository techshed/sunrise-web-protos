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
    .factory('search', ['$resource', 'ApiRoot', 'searchParser', 'currentStore', 'productCache',
        function($resource, ApiRoot, searchParser, currentStore, productCache) {
            var api = $resource(ApiRoot + '/search/products/', {
                'format': 'json',
                'page_size': 12,
                'thumbnail_size': 300,
                'store_id': currentStore
            });

            return {
                fetch: function(params) {
                    var value = {};
                    value.totalProducts = 0;

                    api.get(params).$promise.then(function(data) {
                        searchParser(data, value);

                        _.each(value.products, function(productModel){
                            var cached = productCache.get(productModel.id);

                            if(cached) {
                                // updating an already cached model creates problems
                                // it overwrites the existing values.
                                // cached.update(productModel);
                            } else {
                                productCache.put(productModel.id, productModel);
                            }
                        });
                    });
                    return value;
                }
            };
        }
    ]);
