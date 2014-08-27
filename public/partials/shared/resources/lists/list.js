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
    .factory('list', ['$resource', 'ApiRoot', 'listCache', 'listParser', 'productCache',
        function($resource, ApiRoot, listCache, listParser, productCache) {

            var api;

            api = $resource(ApiRoot + '/lists/:id/', {}, {

                addItem: {
                    url: ApiRoot + '/lists/:id/item/',
                    method: 'POST',
                    params: {
                        id: '@id'
                    }
                },

                deleteItem: {
                  url: ApiRoot + '/lists/:id/item/:itemId',
                  method: 'DELETE',
                  params: {
    //                  id: '@id',
    //                  itemId: '@itemId'
                  }
                }
            });

            return {
                fetch: function(params, callback) {
                    var value,
                        cachedList = listCache.get(params.id);

                    value = cachedList || {};

                    if (cachedList === undefined) {
                        api.get(params).$promise.then(function(data) {
                            listParser(data, value);
                            _.each(value.items, function(productModel) {
                                var cachedProduct = productCache.get(productModel.id);

                                if (cachedProduct) {
                                    // updating an already cached model creates problems
                                    // it overwrites the existing values.
                                    // cachedProduct.update(productModel);
                                } else {
                                    productCache.put(productModel.id, productModel);
                                }
                            });
                            listCache.put(value.id, value);
                            return callback(value);
                        });
                    } else {
                        return callback(value);
                    }
                },

                addItem: function(params, item, callback) {
                    api.addItem(params, item).$promise.then(function(data) {
                        if (!data.success) {
                            return callback(data);
                        }

                        api.get(params).$promise.then(function(listData) {
                            var value = {};

                            if (!listData.success) {
                                return callback(listData);
                            }

                            listParser(listData, value);
                            listCache.put(value.id, value);

                            return callback({
                                success: true,
                                value: value
                            });
                        });
                    });
                },

                remove: function(listId) {
                    return api.remove({ id:listId });
                }
            };
        }
    ]);
