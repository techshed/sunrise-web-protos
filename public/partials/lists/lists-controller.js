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

    .controller('ListsController', ['$scope', '$state', 'list', 'lists', function($scope, $state, list, lists){

        $scope.newList = false;
        $scope.showLoading = true;

        $scope.init = function() {
            $scope.getLists();
            $scope.$on('listsUpdated', function(event, data) {
                $scope.lists = data;
            });
            $scope.$on('selectedList', function(event, data) {
                setSelectedIndex(data);
            });
        };

        setSelectedIndex = function(selectedList) {
            _.each($scope.lists, function(list, index, array) {
                if (list.id === selectedList.id) {
                    $scope.selectedIndex = index;
                }
            });
        };

        $scope.getLists = function() {
            lists.get({}, function(result) {
                $scope.lists = result.lists;
                $scope.showLoading = false;

                // If the lists is not empty, show the details
                // of the firsts list without changing the URL
                if ($scope.lists.length > 0) {

                    // This if statement is important because if user wants to
                    // go to specific list with state('lists.list'),
                    // we don't want to redirect them to the first list
                    if ($state.is('lists')) {
                        $state.go('lists.list', { id:$scope.lists[0].id }, {
                            location: false
                        });
                    }
                }
            }, function(error) {
                $scope.showLoading = false;
                $scope.showLoadingError = true;
            });
        };

        $scope.addList = function() {
            $scope.newList = true;
        };

        $scope.cancelNewList = function() {
            $scope.newList = false;
        };

        $scope.createList = function(listName) {
            if (listName === '') {
                $scope.newList = false;
                return;
            }

            list = { list_name: listName };
            lists.createList(list).$promise.then(function(result) {
                $scope.lists.unshift(result.list);
                $scope.select($scope.selectedIndex + 1);
            });
            $scope.newList = false;
        };

        $scope.deleteList = function(id) {
            lists.deleteList(id);
        };

        $scope.select = function(i) {
          $scope.selectedIndex = i;
        };

        $scope.init();
    }]);
