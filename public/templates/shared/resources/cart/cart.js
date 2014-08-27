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
    .factory('CartResource', ['$dialogs',
                                '$q',
                                '$timeout',
                                'CartResourceApi',
                                'cartParser',
                                'CartModel',
                                'currentStore',
        function($dialogs,
                    $q,
                    $timeout,
                    CartResourceApi,
                    cartParser,
                    CartModel,
                    currentStore) {

            var api = CartResourceApi,
                cart = new CartModel(),
                _cachedCart,
                _timers = {},
                _loading = {},
                _setLoading = function(id, value) {
                    _loading[id] = value;
                };

            return {

                // For debugging
                api: api,

                _handleError: function(data, promise) {
                    var errors = [];
                    if (data.errors) {
                        _.each(data.errors, function(error) {
                            errors.push(error.message);
                        });
                        if (promise){
                            promise.reject(errors);
                        } else {
                            $dialogs.error('Error', errors.join('\n---\n'));
                        }
                    }
                },

                // Check if the given item is currently loading ajax content
                isLoading: function(product) {
                    return _loading[product.id];
                },

                // Get detail of a cart, this usually be called once
                // because every api operation updates cart object from
                // their response and no need to make another api request
                getCartModel: function(force) {
                    var self = this;

                    // if it was already loaded
                    // don't load again except when forced
                    if (_cachedCart && force !== true) {
                        return _cachedCart;
                    }

                    // Don't start another load while still loading
                    if (self.isLoading({id: 'cart'})) {
                        return cart;
                    }

                    // Set it as loading
                    _setLoading('cart', true);
                    // or else fetch the cart info
                    api.get().$promise.then(function(data) {
                        if (data.success) {
                            cartParser(data, cart);
                            // put cart model ref to cached cart
                            _cachedCart = cart;
                        } else {
                            self._handleError(data);
                        }
                    })["catch"](function(xhr){
                        self._handleError(xhr.data);
                    })["finally"](function() {
                        _setLoading('cart', false);
                    });

                    return cart;
                },


                // Adds a product to cart
                addProduct: function(product, fulfillment, quantity) {
                    var self = this;
                    // TODO(Caner): return a promise in other cart methods also
                    var deferred = $q.defer();
                    _setLoading(product.id, true);
                    api.addNewItem({
                        item_id: product.id,
                        store_id: currentStore,
                        method: fulfillment || product.defaultFulfillment,
                        quantity: quantity || 1
                    }).$promise.then(function(data) {
                        if (data.success) {
                            cartParser(data, cart);
                            deferred.resolve(cart);
                        } else {
                            self._handleError(data, deferred);
                        }
                    })["catch"](function(xhr){
                        self._handleError(xhr.data, deferred);
                    })["finally"](function(){
                        _setLoading(product.id, false);
                        deferred.reject();
                    });
                    return deferred.promise;
                },

                // Removes a product from cart by setting it's quantity to 0
                removeProduct: function(product) {
                    this.setQuantity(product, 0);
                },

                // Checks if given product is in cart or not
                hasProduct: function(product) {
                    var cartItem = this.getCartItemByProductId(product.id);
                    return cartItem !== false;
                },

                // pass product itself, fulfillment is optional
                // default fulfillment will be used otherwise
                incrementQuantity: function(product, fulfillment) {
                    var qty = this.getQuantity(product);
                    this.setQuantity(product, qty + 1, fulfillment);
                },

                // pass product itself, fulfillment is optional
                // default fulfillment will be used otherwise
                decrementQuantity: function(product, fulfillment) {
                    var qty = this.getQuantity(product);
                    this.setQuantity(product, qty - 1, fulfillment);
                },

                // Set's the quantity of an item to a given amount
                // Debounces the operation so when it gets called
                // frequently it only updates once.
                // fulfillment is optional default fulfillment will
                // be used otherwise
                setQuantity: function(product, qty, fulfillment) {
                    var cartItem = this.getCartItemByProductId(product.id),
                        self = this;

                    cartItem.quantity = qty;

                    // Debounce this operation
                    $timeout.cancel(_timers[product.id]);
                    _timers[product.id] = $timeout(function() {
                        self.updateCartItem({
                            line_item_id: cartItem.id,
                            productId: product.id,
                            method: fulfillment || cartItem.fulfillment || product.defaultFulfillment,
                            quantity: cartItem.quantity
                        });
                    }, 1000);
                },

                // Returns the quantity of an item
                getQuantity: function(product) {
                    var cartItem = this.getCartItemByProductId(product.id);
                    return cartItem ? cartItem.quantity : 0;
                },

                // Get a cart item from cart by product id
                getCartItemByProductId: function(id) {
                    var found = false;
                    _.each(cart.items, function(item) {
                        if (item.product.id === id) {
                            found = item;
                        }
                    });
                    return found;
                },

                // Update cart item with new information
                updateCartItem: function(item) {
                    var self = this;
                    api.updateItems({
                        line_items: [item],
                        store_id: currentStore
                    }).$promise.then(function(data) {
                        if (data.success) {
                            cartParser(data, cart);
                        } else {
                            self._handleError(data);
                        }
                    })["catch"](function(xhr){
                        self._handleError(xhr.data);
                    });
                    return cart;
                },

                // Update multiple cart item in a single request
                updateCartItems: function(items) {
                    var self = this;
                    _.each(items, function(item) {
                        _setLoading(item.productId, true);
                    });
                    api.updateItems({
                        line_items: items,
                        store_id: currentStore
                    }).$promise.then(function(data) {
                        if (data.success) {
                            cartParser(data, cart);
                        } else {
                            self._handleError(data);
                        }
                    })["catch"](function(xhr){
                        _handleError(xhr.data);
                    })["finally"](function(){
                        _.each(items, function(item) {
                            self._setLoading(item.productId, false);
                        });
                    });

                    return cart;
                }
            };
        }
    ]);
