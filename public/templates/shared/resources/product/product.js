
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
    .factory('product', ['$resource', 'ApiRoot', 'currentStore', 'productParser', 'Product', 'productCache',
        function($resource, ApiRoot, currentStore, productParser, Product, productCache) {

            // Set up the API end point for pulling product information
            var api = $resource(ApiRoot + '/products/:id/', {
                'format': 'json',
                'thumbnail_size': 300,
                'store_id': currentStore
            }, {
                getByStoreSku: {
                    url: ApiRoot + '/products/storesku/:id/'
                },
                // Fetch multiple products by product_id's.
                // Doesn't support storesku's
                getBatch: {
                    url: ApiRoot + '/products/'
                }
            });

            return {

                fetch: function(params) {

                    var value,
                        cached = productCache.get(params.id);

                    value = cached || new Product();

                    if (value.empty === true) {
                        if (params.storesku) {
                            api.getByStoreSku({ id: params.id }).$promise.then(function(data) {
                                data.empty = false;
                                productParser(data, value);
                                productCache.put(params.id, value);
                            });
                        } else {
                            api.get({ id: params.id }).$promise.then(function(data) {
                                data.empty = false;
                                productParser(data, value);
                                productCache.put(params.id, value);
                            });
                        }
                    }

                    return value;
                },

                fetchAll: function(params) {

                    var products = [],
                        productRefs = {},
                        cachedProducts = [],
                        idsToFetch = [];

                    // Here the products array is prefilled with already cached items.
                    // For others, an empty product object is inserted into the list which
                    // will eventually be filled after data arrives back.
                    // 'productRefs' holds a reference to each empty object with product id, so we
                    // don't have to do a search for each item when data is fetched.
                    params.ids.forEach(function(id) {
                        var cached = productCache.get(id);
                        if (cached && cached.empty !== true) {
                            products.push(cached);
                        } else {
                            var newProduct = new Product({ id: id });
                            productRefs[id] = newProduct;
                            products.push(newProduct);
                            idsToFetch.push(id);
                        }
                    });

                    api.getBatch({ item_ids: idsToFetch.join(',') }).$promise.then(function(data) {

                        _.each(data.products, function(productData){
                            var productObject = productRefs[productData.id.toString()];
                            productData.empty = false;
                            productParser(productData, productObject);
                            productCache.put(productData.id, productObject);
                        });
                    });

                    return products;


                }
            };
        }
    ]);
