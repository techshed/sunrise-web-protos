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
    .factory('recommendation', ['$resource', 'ApiRoot', 'productCache', 'recommendationParser',
        function($resource, ApiRoot, productCache, recommendationParser) {

            // Set up the API end point for pulling recommendation information
            var api = $resource(ApiRoot + '/products/recommendation/', {
                'format': 'json',
                'use_certona': 1,
                'app_id': 'homedepot09',
                'thumbnail_size': 300,
                'schema': 'MobileWeb_NRF_RR'
            });

            return {

                fetch: function(params) {
                    var value = [];

                    api.get({
                        item_ids: params.id
                    }).$promise.then(function(data) {

                        recommendationParser(data, value);

                        _.each(value, function(productModel){
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
