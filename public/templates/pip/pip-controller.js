/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */

angular.module('hdProWeb.pip')
    .controller('PipController', ['$modal',
                                '$scope',
                                '$state',
                                '$stateParams',
                                'hdProWeb.pip.Partials',
                                'list',
                                'lists',
                                'listParser',
                                'product',
                                'recommendation',
                                'Tracking',
        function($modal,
                $scope,
                $state,
                $stateParams,
                Partials,
                list,
                lists,
                listParser,
                product,
                recommendation,
                Tracking) {

            // Status for dropdown menu
            $scope.status = { isOpen: false };

            // Get recommendation for this product
            $scope.results = {};
            $scope.lists = [];
            $scope.addNewListMode = false;

            $scope.init = function() {
                $scope.product = product.fetch({id: $stateParams.id});
                $scope.results.products = recommendation.fetch({ id: $stateParams.id });
                $scope.setLists();
            };

            // TODO(Gercek): This is not correct
            // We need to pull all the lists if they're not in the cache already
            // not on each pip page load
            $scope.setLists = function() {
                $scope.lists = [];
                lists.get().$promise.then(function(result) {
                    _.each(_.pluck(result.lists, "id"), function(id) {
                        list.fetch({ id: id }, function(list) {
                            $scope.lists.push(list);
                        });
                    });
                });
            };

            openAddToListModal = function(addedList) {
                $modal.open({
                    templateUrl: Partials + '/pip.modal-add-to-list.html',
                    controller: 'ModalAddToListController',
                    resolve: {
                        list: function() {
                            return addedList;
                        },
                        product: function() {
                            return $scope.product;
                        }
                    }
                });
            };

            $scope.addToList = function(addedList) {
                var itemsToBeAdded = {
                        items: [{
                            product_id: $scope.product.id,
                            quantity: 1
                        }]
                    },
                    trackingConxtext = {
                        itemCount: addedList.items_count,
                        id: addedList.id
                    };
                list.addItem({ id: addedList.id }, itemsToBeAdded, function(result) {
                    if (result.success) {
                        Tracking.track('PIP - List Add to List Success', trackingConxtext);
                        openAddToListModal(addedList);
                        $scope.setLists();
                    } else {
                        Tracking.track('PIP - List Add to List Error', trackingConxtext);
                        //handle error
                    }
                });
            };

            $scope.isInList = function(list){
                return _.findWhere(list.items, { id: $scope.product.id }) !== undefined;
            };

            $scope.enableAddNewListMode = function() {
                $scope.addNewListMode = true;
            };

            $scope.disableAddNewListMode = function() {
                $scope.addNewListMode = false;
            };

            $scope.createList = function(listName) {
                var list = {
                        list_name: listName
                    };

                if (listName === undefined) {
                    //TODO: Handle Error
                    $scope.disableAddNewListMode();
                    return;
                }

                lists.createList(list).$promise.then(function(result) {
                    if (result.success) {
                        $scope.lists.unshift(result.list);
                        $scope.disableAddNewListMode();
                    }
                });
            };

            // initialize scope
            $scope.init();
        }
    ]);
