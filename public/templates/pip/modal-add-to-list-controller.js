/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Gercek Karakus
 */

angular.module('hdProWeb')

    .controller('ModalAddToListController', ['$modalInstance', '$scope', '$state', 'list', 'product',
        function($modalInstance, $scope, $state, list, product) {

            $scope.list = list;
            $scope.product = product;

            $scope.dismiss = function() {
                $modalInstance.dismiss();
            };

            $scope.save = function() {
                $modalInstance.close($scope.selectedList);
            };

            $scope.redirectToList = function(list) {
                $state.go("lists.list", { id:list.id });
                $modalInstance.dismiss();
            };
        }
    ]);
