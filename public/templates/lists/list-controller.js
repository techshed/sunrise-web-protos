/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */

angular.module('hdProWeb.lists')
    .constant('ListModeShow', 'ListModeShow')
    .constant('ListModeEdit', 'ListModeEdit')

    .controller('ListController', ['$dialogs',
                                '$scope',
                                '$state',
                                '$stateParams',
                                'list',
                                'lists',
                                'listCache',
                                'ListModeShow',
                                'ListModeEdit',
                                'Tracking',
        function($dialogs,
                $scope,
                $state,
                $stateParams,
                list,
                lists,
                listCache,
                ListModeShow,
                ListModeEdit,
                Tracking) {

            var track = function(name) {
              Tracking.track("Lists - " + name, {
                  itemCount: $scope.list.itemsCount,
                  id: $scope.list.id,
                  subtotal: $scope.list.subtotal
              });
            };

            $scope.mode = ListModeShow;

            $scope.init = function() {
                list.fetch({ id: $stateParams.id }, function(result) {
                    $scope.list = result;
                    $scope.$emit('selectedList',result);
                });
                lists.get({}, function(result) {
                    $scope.lists = result.lists;
                });
            };

            $scope.setMode = function(mode) {
                 $scope.mode = mode;
            };

            $scope.updateList = function(list) {
                // TODO(Volkan): will update the list.
                // list.updateList({ id: list.id}, list);
                $scope.setMode(ListModeShow); //This will be called on success
            };

            $scope.email = function() {
                $dialogs.notify('Info', 'email');
                track('Email List');
            };

            $scope.print = function() {
                $dialogs.notify('Info', 'print');
                track('Print List');
            };

            $scope.edit = function() {
                $scope.setMode(ListModeEdit);
                track('Edit List');
            };

            $scope.remove = function(removedList) {
                var confirm = $dialogs.confirm('Please Confirm', 'Delete ' + removedList.name + '?');
                confirm.result.then(
                    function(btn) {
                        list.remove(removedList.id).$promise.then(
                            function(successResult) {
                                $dialogs.notify('Success', 'List deleted successfully.');
                                track('Delete List Success');
                                listCache.remove(removedList.id);

                                // When the list is deleted, instead of updating the $scope.list by api
                                // it removes the deleted list and emits up to the scope hierarchy.
                                // At lists-controller.js $scope.lists is updated by $scope.$on('listsUpdated').
                                _.each($scope.lists, function(list, index, array) {
                                    if (list.id === removedList.id) {
                                        $scope.lists.splice(index, 1);
                                        $scope.$emit('listsUpdated', $scope.lists);
                                    }
                                });
                                if ($scope.lists.length === 0) {
                                    $state.go('lists');
                                } else {
                                    $state.go('lists.list', { id: $scope.lists[0].id });
                                }
                            }, function(errorResult) {
                                $dialogs.error('Error', 'Error occurred while processing your request. Please try again.');
                                track('Delete List Error');
                            }
                        );
                    }
                );
            };

            $scope.init();
        }
    ]);
