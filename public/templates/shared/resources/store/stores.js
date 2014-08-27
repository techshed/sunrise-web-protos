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

     .factory('stores', ['$resource', 'ApiRoot', 'Store', 'storeCache', 'storeParser',
        function($resource, ApiRoot, Store, storeCache, storeParser) {
            var api = $resource(ApiRoot + '/stores/search/', {
                'format': 'json'
            });

            return {
                fetch: function(params) {
                    var value = [];

                    api.get(params).$promise.then(function(data) {
                        storeParser(data, value);

                        _.each(value, function(storeModel){
                            var cached = storeCache.get(storeModel.storeId);

                            if (!cached) {
                                storeCache.put(storeModel.storeId, storeModel);
                            }
                        });
                    });
                    return value;
                }
            };
        }
    ]);
